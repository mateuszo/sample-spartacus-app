import { Provider, Type } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import { OutletPosition, ProductListOutlets, provideOutlet } from '@spartacus/storefront';
import { JoistAccountLink } from './account/joist-account-link';
import { JoistCartTotals } from './cart/joist-cart-totals';
import { JoistFooter } from './footer/joist-footer';
import { JoistHeader } from './header/joist-header';
import { JoistDepartments } from './home/joist-departments';
import { JoistEmptySlot } from './home/joist-empty-slot';
import { JoistHero } from './home/joist-hero';
import { JoistServices } from './home/joist-services';
import { JoistLogo } from './logo/joist-logo';
import { JoistMegaNav } from './mega-nav/joist-mega-nav';
import { JoistMiniCart } from './mini-cart/joist-mini-cart';
import { JoistPageHeader } from './page-header/joist-page-header';
import { JoistAddToCart } from './product/joist-add-to-cart';
import { JoistItemDetails } from './product/joist-item-details';
import { JoistProductIntro } from './product/joist-product-intro';
import { JoistProductList } from './product/joist-product-list';
import { JoistProductSummary } from './product/joist-product-summary';

const replace = (id: string, component: Type<unknown>) =>
  provideOutlet({ id, component, position: OutletPosition.REPLACE });

/**
 * Joist replacements for Spartacus UI. Outlets swap whole regions (header,
 * footer, homepage sections); CMS mappings swap individual CMS components.
 */
export function provideJoist(): Provider[] {
  return [
    // Page chrome
    replace('cx-header', JoistHeader),
    replace('cx-footer', JoistFooter),
    replace('SiteLogo', JoistLogo),
    replace('BottomHeaderSlot', JoistPageHeader),

    // Homepage (LandingPage2Template) sections
    replace('Section1', JoistHero),
    replace('Section2A', JoistDepartments),
    replace('Section2B', JoistEmptySlot),
    replace('Section2C', JoistEmptySlot),
    replace('Section4', JoistServices),
    replace('Section5', JoistEmptySlot),

    // Product listing cards and rows
    replace(ProductListOutlets.ITEM_DETAILS, JoistItemDetails),

    provideConfig(<CmsConfig>{
      cmsComponents: {
        MiniCartComponent: { component: JoistMiniCart },
        LoginComponent: { component: JoistAccountLink },
        CategoryNavigationComponent: { component: JoistMegaNav },
        ProductIntroComponent: { component: JoistProductIntro },
        ProductSummaryComponent: { component: JoistProductSummary },
        ProductAddToCartComponent: { component: JoistAddToCart },
        CMSProductListComponent: { component: JoistProductList },
        ProductGridComponent: { component: JoistProductList },
        SearchResultsListComponent: { component: JoistProductList },
        CartTotalsComponent: { component: JoistCartTotals },
      },
    }),

    // Joist vocabulary: a trolley, not a cart. Deep-merged over the Spartacus English strings.
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: {
            cart: {
              cartDetails: { cartName: 'Trolley #{{code}}', proceedToCheckout: 'Go to checkout' },
              cartItems: {
                cartTotal: 'Trolley total ({{count}} item)',
                cartTotal_other: 'Trolley total ({{count}} items)',
                caption: 'Items in your trolley.',
              },
            },
            product: {
              addToCart: {
                addToCart: 'Add to trolley',
                viewCart: 'View trolley',
                itemAddedToYourCart: 'Added to your trolley',
              },
            },
          },
        },
      },
    }),
  ];
}
