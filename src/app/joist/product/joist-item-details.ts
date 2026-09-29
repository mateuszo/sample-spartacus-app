import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '@spartacus/core';
import { ProductListItemContext, StarRatingComponent } from '@spartacus/storefront';

type StockState = 'in' | 'low' | 'out';

/**
 * Product details on listing cards and rows (replaces the ITEM_DETAILS
 * outlet): SKU, rating, stock badge and price.
 */
@Component({
  selector: 'app-joist-item-details',
  imports: [StarRatingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product(); as product) {
      <p class="sku">SKU {{ product.code }}</p>
      @if (product.averageRating) {
        <div class="rating">
          <cx-star-rating [rating]="product.averageRating" />
          @if (product.numberOfReviews) {
            <span class="rating__count">({{ product.numberOfReviews }})</span>
          }
        </div>
      }
      @if (stock(); as stock) {
        <p class="stock stock--{{ stock.state }}">{{ stock.label }}</p>
      }
      <p class="price">
        <span class="price__value">{{ product.price?.formattedValue }}</span>
        <span class="price__unit">each · inc. VAT</span>
      </p>
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: var(--joist-space-2);
      flex-grow: 1;
      align-content: start;
    }

    p {
      margin: 0;
    }

    .sku {
      font-family: var(--joist-font-mono);
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1rem;
      color: var(--joist-ink-muted);
    }

    .rating {
      display: flex;
      align-items: center;
      gap: var(--joist-space-1);
      font-size: 0.875rem;
    }

    .rating__count {
      color: var(--joist-ink-muted);
    }

    .stock {
      display: inline-flex;
      align-items: center;
      justify-self: start;
      gap: var(--joist-space-1);
      padding: var(--joist-space-1) var(--joist-space-2);
      border-radius: var(--joist-radius-sm);
      font-size: 0.8125rem;
      font-weight: 600;
      line-height: 1rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .stock::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
    }

    .stock--in {
      background: var(--joist-level-100);
      color: var(--joist-level-700);
    }

    .stock--low {
      background: var(--joist-hivis-100);
      color: var(--joist-hivis-800);
    }

    .stock--out {
      background: var(--joist-brick-100);
      color: var(--joist-brick-700);
    }

    .price {
      display: grid;
      margin-top: var(--joist-space-1);
    }

    .price__value {
      font-family: var(--joist-font-display);
      font-size: 1.75rem;
      font-weight: 700;
      line-height: 2rem;
      font-variant-numeric: tabular-nums;
    }

    .price__unit {
      font-size: 0.8125rem;
      color: var(--joist-ink-muted);
    }
  `,
})
export class JoistItemDetails {
  private readonly context = inject(ProductListItemContext);

  protected readonly product = toSignal<Product>(this.context.product$);

  protected readonly stock = computed<{ state: StockState; label: string } | undefined>(() => {
    const stock = this.product()?.stock;
    if (!stock?.stockLevelStatus) {
      return undefined;
    }
    if (stock.stockLevelStatus === 'outOfStock') {
      return { state: 'out', label: 'Out of stock' };
    }
    if (stock.stockLevelStatus === 'lowStock') {
      return { state: 'low', label: stock.stockLevel ? `Low stock · ${stock.stockLevel} left` : 'Low stock' };
    }
    return { state: 'in', label: stock.stockLevel ? `In stock · ${stock.stockLevel}` : 'In stock' };
  });
}
