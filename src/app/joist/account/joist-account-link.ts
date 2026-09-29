import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AuthService, UrlPipe } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { of, switchMap } from 'rxjs';

/** Header account entry: "Sign in" for guests, a greeting and account link once signed in. */
@Component({
  selector: 'app-joist-account-link',
  imports: [RouterLink, UrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (user(); as user) {
      <a class="account" [routerLink]="{ cxRoute: 'orders' } | cxUrl">
        <span class="account__icon fa-solid fa-user" aria-hidden="true"></span>
        <span class="account__text">
          <span class="account__eyebrow">Hi, {{ user.firstName }}</span>
          <span class="account__action">Your account</span>
        </span>
      </a>
    } @else {
      <a class="account" [routerLink]="{ cxRoute: 'login' } | cxUrl">
        <span class="account__icon fa-solid fa-user" aria-hidden="true"></span>
        <span class="account__text">
          <span class="account__eyebrow">Sign in</span>
          <span class="account__action">Account</span>
        </span>
      </a>
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .account {
      display: inline-flex;
      align-items: center;
      gap: var(--joist-space-2);
      min-height: 48px;
      padding-inline: var(--joist-space-2);
      color: var(--joist-ink-inverse);
      text-decoration: none;
      border-radius: var(--joist-radius-md);
    }

    .account:hover {
      color: var(--joist-hivis-500);
    }

    .account:focus-visible {
      outline: 2px solid var(--joist-hivis-500);
      outline-offset: 2px;
    }

    .account__icon {
      font-size: 1.25rem;
    }

    .account__text {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }

    .account__eyebrow {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--joist-concrete-300);
    }

    .account__action {
      font-family: var(--joist-font-display);
      font-size: 1.125rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }
  `,
})
export class JoistAccountLink {
  private readonly auth = inject(AuthService);
  private readonly userAccount = inject(UserAccountFacade);

  protected readonly user = toSignal(
    this.auth.isUserLoggedIn().pipe(switchMap((loggedIn) => (loggedIn ? this.userAccount.get() : of(undefined)))),
  );
}
