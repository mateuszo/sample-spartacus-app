import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MiniCartComponentService } from '@spartacus/cart/base/components/mini-cart';
import { UrlPipe } from '@spartacus/core';

/** Trolley button in the header: item count and running total. */
@Component({
  selector: 'app-joist-mini-cart',
  imports: [RouterLink, UrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="trolley" [routerLink]="{ cxRoute: 'cart' } | cxUrl" [attr.aria-label]="label()">
      <span class="trolley__icon fa-solid fa-cart-shopping" aria-hidden="true"></span>
      <span class="trolley__text" aria-hidden="true">
        <span class="trolley__label">Trolley</span>
        <span class="trolley__total">{{ total() }}</span>
      </span>
      <span class="trolley__count" aria-hidden="true">{{ quantity() }}</span>
    </a>
  `,
  styles: `
    :host {
      display: block;
    }

    .trolley {
      display: inline-flex;
      align-items: center;
      gap: var(--joist-space-3);
      min-height: 48px;
      padding: var(--joist-space-1) var(--joist-space-3);
      border-radius: var(--joist-radius-md);
      background: var(--joist-action);
      color: var(--joist-on-action);
      text-decoration: none;
    }

    .trolley:hover {
      background: var(--joist-action-hover);
      color: var(--joist-on-action);
    }

    .trolley:focus-visible {
      outline: 2px solid var(--joist-ink-inverse);
      outline-offset: 2px;
    }

    .trolley__icon {
      font-size: 1.25rem;
    }

    .trolley__text {
      display: none;
      flex-direction: column;
      line-height: 1.1;
    }

    .trolley__label {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .trolley__total {
      font-family: var(--joist-font-display);
      font-size: 1.125rem;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }

    .trolley__count {
      display: grid;
      place-items: center;
      min-width: 24px;
      height: 24px;
      padding-inline: var(--joist-space-1);
      border-radius: var(--joist-radius-pill);
      background: var(--joist-graphite-900);
      color: var(--joist-hivis-500);
      font-size: 0.8125rem;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }

    @media (min-width: 992px) {
      .trolley__text {
        display: flex;
      }
    }
  `,
})
export class JoistMiniCart {
  private readonly miniCart = inject(MiniCartComponentService);

  protected readonly quantity = toSignal(this.miniCart.getQuantity(), { initialValue: 0 });
  protected readonly total = toSignal(this.miniCart.getTotalPrice(), { initialValue: '' });

  protected readonly label = computed(() => {
    const count = this.quantity();
    const items = count === 1 ? '1 item' : `${count} items`;
    return this.total() ? `Trolley, ${items}, ${this.total()}` : `Trolley, ${items}`;
  });
}
