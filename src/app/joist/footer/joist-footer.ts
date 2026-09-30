import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FocusDirective, PageSlotComponent, SkipLinkDirective } from '@spartacus/storefront';
import { JOIST_DEPARTMENTS } from '../catalog/joist-departments.data';
import { JoistCompareTray } from '../compare/joist-compare-tray';
import { JoistLogo } from '../logo/joist-logo';

interface FooterLink {
  readonly label: string;
  readonly path: string;
}

/**
 * Joist site footer. Replaces the Spartacus `cx-footer` outlet with Joist
 * navigation. The CMS Footer slot is kept for its consent link, consent
 * banner and scroll-to-top button; its SAP navigation and notice are hidden.
 */
@Component({
  selector: 'app-joist-footer',
  imports: [RouterLink, FocusDirective, SkipLinkDirective, PageSlotComponent, JoistLogo, JoistCompareTray],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './joist-footer.html',
  styleUrl: './joist-footer.scss',
})
export class JoistFooter {
  protected readonly departments = JOIST_DEPARTMENTS;

  protected readonly help: readonly FooterLink[] = [
    { label: 'Find a depot', path: '/store-finder' },
    { label: 'Track an order', path: '/my-account/orders' },
    { label: 'Quick order by SKU', path: '/my-account/quick-order' },
    { label: 'Help & FAQs', path: '/faq' },
    { label: 'Contact us', path: '/contact' },
  ];

  protected readonly account: readonly FooterLink[] = [
    { label: 'Sign in', path: '/login' },
    { label: 'Open an account', path: '/login/register' },
    { label: 'Your trolley', path: '/cart' },
    { label: 'Saved trolleys', path: '/my-account/saved-carts' },
  ];
}
