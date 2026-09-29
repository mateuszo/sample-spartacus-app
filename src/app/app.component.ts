import { Component, signal } from '@angular/core';
import { OutletRefDirective, StorefrontComponent } from '@spartacus/storefront';
import { JoistLogo } from './joist/logo/joist-logo';

@Component({
  selector: 'app-root',
  imports: [StorefrontComponent, OutletRefDirective, JoistLogo],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  protected readonly title = signal('my-spartacus-app');
}
