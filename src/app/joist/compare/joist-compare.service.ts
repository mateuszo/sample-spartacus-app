import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Product, ProductScope, ProductService, WindowRef } from '@spartacus/core';
import { combineLatest, of, startWith, switchMap } from 'rxjs';

/** Most products that fit side by side in the comparison view. */
export const JOIST_COMPARE_LIMIT = 4;

const STORAGE_KEY = 'joist.compare';

const COMPARE_SCOPES = [
  ProductScope.LIST,
  ProductScope.DETAILS,
  ProductScope.PRICE,
  ProductScope.STOCK,
  ProductScope.ATTRIBUTES,
];

/**
 * The products a shopper has picked for comparison, by product code.
 * Kept in localStorage so the selection survives page loads; storage is
 * optional (SSR, private browsing) and failures fall back to memory only.
 */
@Injectable({ providedIn: 'root' })
export class JoistCompareService {
  private readonly windowRef = inject(WindowRef);

  private readonly codesState = signal<readonly string[]>(this.restore());

  readonly codes = this.codesState.asReadonly();
  readonly count = computed(() => this.codesState().length);
  readonly isFull = computed(() => this.count() >= JOIST_COMPARE_LIMIT);

  private readonly productService = inject(ProductService);

  /** Selected products in selection order; `undefined` while one is still loading. */
  readonly products = toSignal(
    toObservable(this.codesState).pipe(
      switchMap((codes) =>
        codes.length
          ? combineLatest(
              codes.map((code) => this.productService.get(code, COMPARE_SCOPES).pipe(startWith(undefined))),
            )
          : of([] as (Product | undefined)[]),
      ),
    ),
    { initialValue: [] as (Product | undefined)[] },
  );

  /** Whether the comparison dialog is open. */
  readonly isOpen = signal(false);

  /** Last change, for the tray's live region. */
  readonly announcement = signal('');

  constructor() {
    effect(() => this.persist(this.codesState()));
  }

  has(code: string): boolean {
    return this.codesState().includes(code);
  }

  add(code: string, name = 'Product'): void {
    if (this.has(code) || this.isFull()) {
      return;
    }
    this.codesState.update((codes) => [...codes, code]);
    this.announcement.set(`${name} added to compare. ${this.count()} of ${JOIST_COMPARE_LIMIT} selected.`);
  }

  remove(code: string, name = 'Product'): void {
    if (!this.has(code)) {
      return;
    }
    this.codesState.update((codes) => codes.filter((c) => c !== code));
    this.announcement.set(`${name} removed from compare. ${this.count()} of ${JOIST_COMPARE_LIMIT} selected.`);
    if (this.count() < 2) {
      this.isOpen.set(false);
    }
  }

  toggle(code: string, name?: string): void {
    if (this.has(code)) {
      this.remove(code, name);
    } else {
      this.add(code, name);
    }
  }

  clear(): void {
    this.codesState.set([]);
    this.isOpen.set(false);
    this.announcement.set('Compare list cleared.');
  }

  private restore(): string[] {
    try {
      const raw = this.windowRef.localStorage?.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed)
        ? parsed.filter((code): code is string => typeof code === 'string').slice(0, JOIST_COMPARE_LIMIT)
        : [];
    } catch {
      return [];
    }
  }

  private persist(codes: readonly string[]): void {
    try {
      this.windowRef.localStorage?.setItem(STORAGE_KEY, JSON.stringify(codes));
    } catch {
      // Storage unavailable: the selection lasts for this page session only.
    }
  }
}
