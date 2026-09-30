import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MediaComponent } from '@spartacus/storefront';
import { JoistCompareDialog } from './joist-compare-dialog';
import { JOIST_COMPARE_LIMIT, JoistCompareService } from './joist-compare.service';

/** Bottom tray listing the products picked for comparison. Also hosts the comparison dialog. */
@Component({
  selector: 'app-joist-compare-tray',
  imports: [MediaComponent, JoistCompareDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './joist-compare-tray.html',
  styleUrl: './joist-compare-tray.scss',
})
export class JoistCompareTray {
  protected readonly compare = inject(JoistCompareService);
  protected readonly limit = JOIST_COMPARE_LIMIT;

  protected readonly slots = computed(() => {
    const products = this.compare.products();
    const codes = this.compare.codes();
    return Array.from({ length: JOIST_COMPARE_LIMIT }, (_, i) => ({
      code: codes[i],
      product: products[i],
    }));
  });

  protected readonly canCompare = computed(() => this.compare.count() >= 2);
}
