import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Joist wordmark: hi-vis mark plus block-cut letters. Letters use
 * `currentColor`, so the logo follows the text color of its container
 * (white on the graphite header, graphite on light surfaces).
 */
@Component({
  selector: 'app-joist-logo',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'joist-logo' },
  template: `
    <a routerLink="/" [attr.aria-label]="label()">
      <svg viewBox="0 0 175 48" [attr.height]="height()" aria-hidden="true" focusable="false">
        <rect width="48" height="48" rx="4" fill="#ffc20e" />
        <path fill="#1c1e1f" d="M12 10h24v6H12zM26 16h6v22H12V26h6v6h8z" />
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M60 6h22v7H60zM75 13h7v29H60V28h7v7h8zM87 6h22v36H87zM94 13v22h8V13zM114 6h7v36h-7zM126 6h22v7h-22zM126 13h7v7.5h-7zM126 20.5h22v7h-22zM141 27.5h7v7.5h-7zM126 35h22v7h-22zM153 6h22v7h-22zM160.5 13h7v29h-7z"
        />
      </svg>
    </a>
  `,
  styles: `
    :host {
      display: inline-block;
      color: inherit;
    }

    a {
      display: inline-flex;
      color: inherit;
      border-radius: var(--joist-radius-sm);
    }

    a:focus-visible {
      outline: 2px solid var(--joist-hivis-500);
      outline-offset: 4px;
    }

    svg {
      display: block;
      width: auto;
    }
  `,
})
export class JoistLogo {
  readonly height = input(40);
  readonly label = input('Joist, go to homepage');
}
