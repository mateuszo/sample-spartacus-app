import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActiveCartFacade } from '@spartacus/cart/base/root';

/** Order value that qualifies for free delivery, in the cart's currency. */
export const JOIST_FREE_DELIVERY_THRESHOLD = 75;

/** Trolley summary (replaces CartTotalsComponent): free-delivery meter and totals. */
@Component({
  selector: 'app-joist-cart-totals',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './joist-cart-totals.html',
  styleUrl: './joist-cart-totals.scss',
})
export class JoistCartTotals {
  private readonly activeCart = inject(ActiveCartFacade);

  protected readonly cart = toSignal(this.activeCart.getActive());
  protected readonly threshold = JOIST_FREE_DELIVERY_THRESHOLD;

  protected readonly currency = computed(() => this.cart()?.subTotal?.currencyIso ?? 'GBP');
  protected readonly subtotal = computed(() => this.cart()?.subTotal?.value ?? 0);
  protected readonly remaining = computed(() => Math.max(0, this.threshold - this.subtotal()));
  protected readonly progress = computed(() => Math.min(100, Math.round((this.subtotal() / this.threshold) * 100)));
}
