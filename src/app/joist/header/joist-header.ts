import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FocusDirective,
  GlobalMessageComponent,
  HamburgerMenuService,
  PageLayoutComponent,
  PageSlotComponent,
  SkipLinkDirective,
} from '@spartacus/storefront';

/**
 * Joist site header. Replaces the Spartacus `cx-header` outlet: a hi-vis
 * service strip, the graphite main bar (logo, search, account, trolley)
 * and the category bar. On small screens the Spartacus navigation layout
 * takes over behind the hamburger button.
 */
@Component({
  selector: 'app-joist-header',
  imports: [
    PageSlotComponent,
    PageLayoutComponent,
    GlobalMessageComponent,
    FocusDirective,
    SkipLinkDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './joist-header.html',
  styleUrl: './joist-header.scss',
})
export class JoistHeader {
  private readonly hamburgerMenu = inject(HamburgerMenuService);

  protected readonly isExpanded = toSignal(this.hamburgerMenu.isExpanded, { initialValue: false });

  protected readonly focusConfig = computed(() => ({
    disableMouseFocus: true,
    trap: this.isExpanded(),
  }));

  protected collapse(): void {
    this.hamburgerMenu.toggle(true);
  }

  protected collapseIfBackdrop(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'header' && this.isExpanded()) {
      this.collapse();
    }
  }
}
