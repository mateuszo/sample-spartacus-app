import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductIntroComponent, StarRatingComponent } from '@spartacus/storefront';

/**
 * PDP intro (replaces ProductIntroComponent): SKU chip and rating. Extends the
 * Spartacus component to keep its "jump to the Reviews tab" behaviour.
 */
@Component({
  selector: 'app-joist-product-intro',
  imports: [AsyncPipe, DecimalPipe, StarRatingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product$ | async; as product) {
      <div class="intro">
        <span class="sku">SKU {{ product.code }}</span>
        @if (product.averageRating) {
          <span class="rating">
            <cx-star-rating [rating]="product.averageRating" />
            <button type="button" class="rating__link" (click)="showReviews()">
              {{ product.averageRating | number: '1.1-1' }} · {{ product.numberOfReviews ?? 0 }} reviews
            </button>
          </span>
        } @else {
          <span class="rating__none">No reviews yet</span>
        }
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .intro {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--joist-space-3) var(--joist-space-4);
      padding-bottom: var(--joist-space-4);
      border-bottom: 1px solid var(--joist-line);
    }

    .sku {
      padding: var(--joist-space-1) var(--joist-space-2);
      border-radius: var(--joist-radius-sm);
      background: var(--joist-graphite-900);
      color: var(--joist-hivis-500);
      font-family: var(--joist-font-mono);
      font-size: 0.8125rem;
      font-weight: 500;
    }

    .rating {
      display: inline-flex;
      align-items: center;
      gap: var(--joist-space-2);
    }

    .rating__link {
      padding: 0;
      border: 0;
      background: none;
      color: var(--joist-link);
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 3px;
      cursor: pointer;
    }

    .rating__link:hover {
      color: var(--joist-link-hover);
    }

    .rating__link:focus-visible {
      outline: 2px solid var(--joist-focus);
      outline-offset: 2px;
    }

    .rating__none {
      font-size: 0.875rem;
      color: var(--joist-ink-muted);
    }
  `,
})
export class JoistProductIntro extends ProductIntroComponent {}
