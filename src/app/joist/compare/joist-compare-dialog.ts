import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, UrlPipe } from '@spartacus/core';
import { CmsComponentData, MediaComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import { JoistAddToCart } from '../product/joist-add-to-cart';
import { buildCompareSections } from './compare-table';
import { JoistCompareService } from './joist-compare.service';

/**
 * Side-by-side comparison in a native modal dialog: the browser provides
 * focus containment, Escape to close and focus return to the opener.
 */
@Component({
  selector: 'app-joist-compare-dialog',
  imports: [RouterLink, UrlPipe, MediaComponent, JoistAddToCart],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // The add-to-trolley buttons normally get this from the CMS.
  providers: [{ provide: CmsComponentData, useValue: { data$: of({ inventoryDisplay: false }), uid: 'JoistCompare' } }],
  templateUrl: './joist-compare-dialog.html',
  styleUrl: './joist-compare-dialog.scss',
})
export class JoistCompareDialog {
  protected readonly compare = inject(JoistCompareService);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly differencesOnly = signal(false);

  protected readonly products = computed(() =>
    this.compare.products().filter((product): product is Product => !!product),
  );
  protected readonly loading = computed(() => this.products().length < this.compare.count());

  protected readonly sections = computed(() => {
    const sections = buildCompareSections(this.products());
    if (!this.differencesOnly()) {
      return sections;
    }
    return sections
      .map((section) => ({ ...section, rows: section.rows.filter((row) => row.differs) }))
      .filter((section) => section.rows.length);
  });

  constructor() {
    effect(() => {
      const dialog = this.dialog().nativeElement;
      if (this.compare.isOpen() && !dialog.open) {
        dialog.showModal();
      } else if (!this.compare.isOpen() && dialog.open) {
        dialog.close();
      }
    });
  }

  protected onClose(): void {
    this.compare.isOpen.set(false);
  }

  protected toggleDifferences(event: Event): void {
    this.differencesOnly.set((event.target as HTMLInputElement).checked);
  }
}
