import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@spartacus/core';
import {
  PageLayoutService,
  PaginationComponent,
  ProductListComponent,
  ProductListItemComponent,
  ProductScrollComponent,
  ProductViewComponent,
  SortingComponent,
  ViewModes,
} from '@spartacus/storefront';
import { take } from 'rxjs';
import { JoistProductCard } from './joist-product-card';

/**
 * Joist product listing (replaces the CMS product list, grid and search
 * results components). Extends the Spartacus component for sorting, view
 * mode and pagination; renders Joist cards in grid mode.
 */
@Component({
  selector: 'app-joist-product-list',
  imports: [
    AsyncPipe,
    TranslatePipe,
    SortingComponent,
    PaginationComponent,
    ProductViewComponent,
    ProductListItemComponent,
    ProductScrollComponent,
    JoistProductCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './joist-product-list.html',
  styleUrl: './joist-product-list.scss',
})
export class JoistProductList extends ProductListComponent implements OnInit {
  private readonly layout = inject(PageLayoutService);
  private readonly destroyRef = inject(DestroyRef);

  override ngOnInit(): void {
    super.ngOnInit();
    // Spartacus opens list-template pages as rows; Joist always starts on the card grid.
    // This runs after the base class has picked its default from the same stream.
    this.layout.templateName$
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.viewMode$.next(ViewModes.Grid));
  }
}
