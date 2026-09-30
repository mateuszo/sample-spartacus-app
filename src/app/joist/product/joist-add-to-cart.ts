import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { AddToCartComponent } from '@spartacus/cart/base/components/add-to-cart';
import { TranslatePipe } from '@spartacus/core';
import { ItemCounterComponent, OutletDirective } from '@spartacus/storefront';

/**
 * Joist buy box (replaces ProductAddToCartComponent). Extends the Spartacus
 * component, so cart updates, stock rules, pickup-in-store and the added-to-cart
 * dialog behave exactly as before; only the markup is Joist's.
 *
 * On the PDP it shows stock, quantity, delivery method and the button. Inside a
 * product card (list item context) it collapses to the button.
 */
@Component({
  selector: 'app-joist-add-to-cart',
  imports: [AsyncPipe, ReactiveFormsModule, TranslatePipe, ItemCounterComponent, OutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './joist-add-to-cart.html',
  styleUrl: './joist-add-to-cart.scss',
})
export class JoistAddToCart extends AddToCartComponent {
  protected get quantityControl(): UntypedFormControl {
    return this.addToCartForm.controls['quantity'] as UntypedFormControl;
  }

  // `product` and `options` are optional inputs at runtime, although typed as always set.
  protected get productName(): string | undefined {
    return this.product?.name;
  }

  protected get customLabel(): string | undefined {
    return this.options?.addToCartString;
  }

  protected get stockId(): string {
    return `joist-stock-${this.productCode}`;
  }
}
