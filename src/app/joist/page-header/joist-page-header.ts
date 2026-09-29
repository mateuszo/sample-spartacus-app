import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbComponent, CmsComponentData } from '@spartacus/storefront';
import { of } from 'rxjs';

/**
 * Breadcrumb and page <h1> under the header. The backend CMS leaves
 * BottomHeaderSlot empty, so the Spartacus breadcrumb is rendered here
 * with empty component data (it reads everything from page meta).
 */
@Component({
  selector: 'app-joist-page-header',
  imports: [BreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CmsComponentData, useValue: { data$: of({}), uid: 'JoistBreadcrumb' } }],
  template: `<cx-breadcrumb />`,
})
export class JoistPageHeader {}
