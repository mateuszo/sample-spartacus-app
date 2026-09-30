import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { CmsNavigationComponent } from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  CmsComponentData,
  NavigationNode,
  NavigationService,
} from '@spartacus/storefront';
import { filter } from 'rxjs';

export interface MegaGroup {
  readonly title?: string;
  readonly url?: string | string[];
  readonly links: readonly NavigationNode[];
}

export interface MegaItem {
  readonly id: string;
  readonly title: string;
  readonly url?: string | string[];
  readonly groups: readonly MegaGroup[];
}

/**
 * Turns a CMS navigation tree into mega-menu items. Second-level nodes with
 * children become titled columns; second-level leaves are gathered into a
 * leading untitled column.
 */
export function toMegaItems(root: NavigationNode | null | undefined): MegaItem[] {
  return (root?.children ?? []).map((node, index) => {
    const children = node.children ?? [];
    const leaves = children.filter((child) => !child.children?.length);
    const groups: MegaGroup[] = children
      .filter((child) => child.children?.length)
      .map((child) => ({ title: child.title, url: child.url, links: child.children ?? [] }));
    if (leaves.length) {
      groups.unshift({ links: leaves });
    }
    return { id: `mega-${index}`, title: node.title ?? '', url: node.url, groups };
  });
}

const OPEN_DELAY_MS = 120;
const CLOSE_DELAY_MS = 250;

/**
 * Joist category navigation (replaces CategoryNavigationComponent).
 * Desktop: a bar of disclosure buttons, each opening a full-width panel.
 * Below lg (inside the hamburger drawer): an accordion.
 */
@Component({
  selector: 'app-joist-mega-nav',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './joist-mega-nav.html',
  styleUrl: './joist-mega-nav.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class JoistMegaNav {
  private readonly componentData = inject<CmsComponentData<CmsNavigationComponent>>(CmsComponentData);
  private readonly navigation = inject(NavigationService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly root = toSignal(this.navigation.getNavigationNode(this.componentData.data$));
  protected readonly items = computed(() => toMegaItems(this.root()));
  protected readonly isDesktop = toSignal(inject(BreakpointService).isUp(BREAKPOINT.lg), {
    initialValue: true,
  });

  /** Desktop: the item whose panel is open. */
  protected readonly openId = signal<string | null>(null);
  /** Drawer: items expanded in the accordion. */
  protected readonly expanded = signal<ReadonlySet<string>>(new Set());

  private openTimer?: ReturnType<typeof setTimeout>;
  private closeTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.close());

    inject(DestroyRef).onDestroy(() => this.clearTimers());
  }

  // Desktop panel

  protected toggle(id: string): void {
    this.clearTimers();
    this.openId.update((current) => (current === id ? null : id));
  }

  protected hoverOpen(id: string): void {
    this.clearTimers();
    if (this.openId() === id) {
      return;
    }
    // Moving between items while a panel is open switches immediately.
    if (this.openId()) {
      this.openId.set(id);
      return;
    }
    this.openTimer = setTimeout(() => this.openId.set(id), OPEN_DELAY_MS);
  }

  protected hoverLeave(): void {
    clearTimeout(this.openTimer);
    this.closeTimer = setTimeout(() => this.openId.set(null), CLOSE_DELAY_MS);
  }

  protected cancelClose(): void {
    clearTimeout(this.closeTimer);
  }

  protected closeAndFocusTrigger(event: Event): void {
    const id = this.openId();
    if (!id) {
      return;
    }
    // Spartacus's storefront also handles Escape (it moves focus); this one is ours.
    event.stopPropagation();
    this.close();
    this.host.nativeElement.querySelector<HTMLButtonElement>(`[aria-controls="${id}-panel"]`)?.focus();
  }

  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.host.nativeElement.contains(next)) {
      this.close();
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (this.openId() && !this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  // Drawer accordion

  protected isExpanded(id: string): boolean {
    return this.expanded().has(id);
  }

  protected toggleExpanded(id: string): void {
    this.expanded.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  private close(): void {
    this.clearTimers();
    this.openId.set(null);
  }

  private clearTimers(): void {
    clearTimeout(this.openTimer);
    clearTimeout(this.closeTimer);
  }
}
