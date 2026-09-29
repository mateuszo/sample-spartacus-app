import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductScope } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';

/** PDP price block (replaces ProductSummaryComponent): price tag, summary and depot promises. */
@Component({
  selector: 'app-joist-product-summary',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product$ | async; as product) {
      <div class="price">
        <span class="price__value">{{ product.price?.formattedValue }}</span>
        <span class="price__unit">each · inc. VAT</span>
      </div>
      @if (product.summary) {
        <p class="summary" [innerHTML]="product.summary"></p>
      }
      <ul class="promises">
        <li><span class="fa-solid fa-store" aria-hidden="true"></span>Click &amp; collect from your depot in 2 hours</li>
        <li><span class="fa-solid fa-truck" aria-hidden="true"></span>Next-day delivery, free over £75</li>
        <li><span class="fa-solid fa-rotate-left" aria-hidden="true"></span>30-day returns on unused stock</li>
      </ul>
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: var(--joist-space-4);
      padding-block: var(--joist-space-4);
    }

    .price {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: var(--joist-space-3);
    }

    .price__value {
      font-family: var(--joist-font-display);
      font-size: 3rem;
      font-weight: 700;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }

    .price__unit {
      font-size: 0.875rem;
      color: var(--joist-ink-muted);
    }

    .summary {
      margin: 0;
      font-size: 1.0625rem;
      line-height: 1.6;
    }

    .promises {
      display: grid;
      gap: var(--joist-space-2);
      margin: 0;
      padding: var(--joist-space-3) var(--joist-space-4);
      border-inline-start: 4px solid var(--joist-hivis-500);
      background: var(--joist-surface-sunken);
      list-style: none;
      font-size: 0.9375rem;
      font-weight: 500;
    }

    .promises li {
      display: flex;
      align-items: center;
      gap: var(--joist-space-3);
    }

    .promises .fa-solid {
      width: 20px;
      text-align: center;
      color: var(--joist-ink);
    }
  `,
})
export class JoistProductSummary {
  protected readonly product$ = inject(CurrentProductService).getProduct([ProductScope.DETAILS, ProductScope.PRICE]);
}
