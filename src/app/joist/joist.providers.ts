import { Provider, Type } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { OutletPosition, ProductListOutlets, provideOutlet } from '@spartacus/storefront';
import { JoistAccountLink } from './account/joist-account-link';
import { JoistFooter } from './footer/joist-footer';
import { JoistHeader } from './header/joist-header';
import { JoistDepartments } from './home/joist-departments';
import { JoistEmptySlot } from './home/joist-empty-slot';
import { JoistHero } from './home/joist-hero';
import { JoistServices } from './home/joist-services';
import { JoistLogo } from './logo/joist-logo';
import { JoistMiniCart } from './mini-cart/joist-mini-cart';
import { JoistPageHeader } from './page-header/joist-page-header';
import { JoistItemDetails } from './product/joist-item-details';
import { JoistProductIntro } from './product/joist-product-intro';
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
        ProductIntroComponent: { component: JoistProductIntro },
        ProductSummaryComponent: { component: JoistProductSummary },
      },
    }),
  ];
}
