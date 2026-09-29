import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Renders nothing. Used to retire CMS banner slots that don't fit the Joist homepage. */
@Component({
  selector: 'app-joist-empty-slot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  host: { hidden: '' },
})
export class JoistEmptySlot {}
