import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, UrlPipe } from '@spartacus/core';
import {
  CmsComponentData,
  MediaComponent,
  ProductListItemContext,
  ProductListItemContextSource,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { JoistCompareToggle } from '../compare/joist-compare-toggle';
import { JoistAddToCart } from './joist-add-to-cart';
import { JoistItemDetails } from './joist-item-details';

/** Product card for Joist listing grids (category, search, brand pages). */
@Component({
  selector: 'app-joist-product-card',
  imports: [RouterLink, UrlPipe, MediaComponent, JoistItemDetails, JoistAddToCart, JoistCompareToggle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ProductListItemContextSource,
    { provide: ProductListItemContext, useExisting: ProductListItemContextSource },
    // The add-to-cart button normally gets this from the CMS; cards don't show inventory.
    { provide: CmsComponentData, useValue: { data$: of({ inventoryDisplay: false }), uid: 'JoistProductCard' } },
  ],
  template: `
    <article class="card">
      <a
        class="card__media"
        [routerLink]="{ cxRoute: 'product', params: product() } | cxUrl"
        tabindex="-1"
        aria-hidden="true"
      >
        <cx-media [container]="product().images?.['PRIMARY']" format="product" [alt]="product().name ?? ''" />
      </a>
      <h3 class="card__name">
        <a [routerLink]="{ cxRoute: 'product', params: product() } | cxUrl" [innerHTML]="name()"></a>
      </h3>
      <app-joist-item-details />
      @if (product().code; as code) {
        <app-joist-compare-toggle [code]="code" [name]="product().name ?? 'Product'" />
      }
      @if (showAddToCart()) {
        <app-joist-add-to-cart class="card__buy" />
      }
    </article>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--joist-space-3);
      height: 100%;
      padding: var(--joist-space-3) var(--joist-space-3) var(--joist-space-4);
      border: 1px solid var(--joist-line);
      border-radius: var(--joist-radius-md);
      background: var(--joist-surface);
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }

    .card:hover {
      border-color: var(--joist-ink);
      box-shadow: var(--joist-shadow-raised);
    }

    .card__media {
      display: block;
      aspect-ratio: 1;
      padding: var(--joist-space-4);
      border-radius: var(--joist-radius-sm);
      background: var(--joist-surface-sunken);
    }

    .card__media cx-media {
      height: 100%;
    }

    .card__name {
      margin: 0;
      font-family: var(--joist-font-body);
      font-size: 1.0625rem;
      font-weight: 600;
      line-height: 1.4;
      letter-spacing: normal;
      text-transform: none;
    }

    .card__name a {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      overflow: hidden;
      color: var(--joist-ink);
      text-decoration: none;
    }

    .card__name a:hover {
      color: var(--joist-link);
      text-decoration: underline;
    }

    .card__name a:focus-visible {
      outline: 2px solid var(--joist-focus);
      outline-offset: 2px;
    }

    .card__buy {
      margin-top: auto;
    }

    @media (prefers-reduced-motion: reduce) {
      .card {
        transition: none;
      }
    }
  `,
})
export class JoistProductCard {
  readonly product = input.required<Product>();

  private readonly context = inject(ProductListItemContextSource);

  protected readonly name = computed(() => this.product().nameHtml ?? this.product().name ?? '');
  // Same rule as Spartacus's ProductListService, which isn't exported.
  protected readonly showAddToCart = computed(
    () => !!this.product().price && this.product().purchasable !== false,
  );

  constructor() {
    effect(() => this.context.product$.next(this.product()));
  }
}
