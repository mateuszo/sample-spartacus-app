import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { JOIST_COMPARE_LIMIT, JoistCompareService } from './joist-compare.service';

/** "Compare" toggle for product cards and the product page. */
@Component({
  selector: 'app-joist-compare-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="compare"
      [class.is-on]="selected()"
      [attr.aria-pressed]="selected()"
      [attr.aria-label]="label()"
      [attr.aria-describedby]="blocked() ? hintId() : null"
      [disabled]="blocked()"
      (click)="compare.toggle(code(), name())"
    >
      <span class="compare__box" aria-hidden="true">
        @if (selected()) {
          <span class="fa-solid fa-check"></span>
        }
      </span>
      <span class="compare__text" aria-hidden="true">{{ selected() ? 'Comparing' : 'Compare' }}</span>
    </button>
    @if (blocked()) {
      <span class="compare__hint" [id]="hintId()">Compare holds {{ limit }} products</span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--joist-space-1) var(--joist-space-2);
    }

    .compare {
      display: inline-flex;
      align-items: center;
      gap: var(--joist-space-2);
      min-height: 32px;
      padding: 0;
      border: 0;
      background: none;
      color: var(--joist-ink);
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
    }

    .compare:hover .compare__text {
      text-decoration: underline;
    }

    .compare:focus-visible {
      outline: 2px solid var(--joist-focus);
      outline-offset: 2px;
      border-radius: var(--joist-radius-sm);
    }

    .compare:disabled {
      color: var(--joist-ink-muted);
      cursor: not-allowed;
    }

    .compare__box {
      display: grid;
      place-items: center;
      width: 20px;
      height: 20px;
      border: 2px solid currentColor;
      border-radius: var(--joist-radius-sm);
      font-size: 0.75rem;
    }

    .is-on .compare__box {
      border-color: var(--joist-graphite-900);
      background: var(--joist-graphite-900);
      color: var(--joist-hivis-500);
    }

    .compare__hint {
      font-size: 0.75rem;
      color: var(--joist-ink-muted);
    }
  `,
})
export class JoistCompareToggle {
  readonly code = input.required<string>();
  readonly name = input<string>('Product');

  protected readonly compare = inject(JoistCompareService);
  protected readonly limit = JOIST_COMPARE_LIMIT;

  protected readonly selected = computed(() => this.compare.codes().includes(this.code()));
  protected readonly blocked = computed(() => !this.selected() && this.compare.isFull());
  protected readonly hintId = computed(() => `compare-hint-${this.code()}`);
  // With aria-pressed the name stays the same; the pressed state carries on/off.
  protected readonly label = computed(() => `Compare ${this.name()}`);
}
