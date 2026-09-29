import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JOIST_DEPARTMENTS } from '../catalog/joist-departments.data';

/** "Shop by department" tile grid (replaces the CMS Section2A banners). */
@Component({
  selector: 'app-joist-departments',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="departments" aria-labelledby="departments-title">
      <div class="departments__head">
        <h2 id="departments-title" class="departments__title">Shop by department</h2>
        <p class="departments__lead">Everything from first fix to finishing, stocked in depot.</p>
      </div>
      <ul class="departments__grid">
        @for (department of departments; track department.query) {
          <li>
            <a class="tile" [routerLink]="['/search', department.query]">
              <span class="tile__icon fa-solid {{ department.icon }}" aria-hidden="true"></span>
              <span class="tile__name">{{ department.name }}</span>
              <span class="tile__detail">{{ department.detail }}</span>
              <span class="tile__arrow fa-solid fa-arrow-right" aria-hidden="true"></span>
            </a>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      background: var(--joist-surface-sunken);
      border-block: 1px solid var(--joist-line);
    }

    .departments {
      max-width: var(--cx-page-width-max);
      margin-inline: auto;
      padding: var(--joist-space-12) var(--joist-space-4);
    }

    .departments__head {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--joist-space-2) var(--joist-space-6);
      margin-bottom: var(--joist-space-6);
    }

    .departments__title {
      margin: 0;
      font-family: var(--joist-font-display);
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.125;
      text-transform: uppercase;
    }

    .departments__lead {
      margin: 0;
      color: var(--joist-ink-muted);
    }

    .departments__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: var(--joist-space-3);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .tile {
      position: relative;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-areas: 'icon name' 'icon detail';
      column-gap: var(--joist-space-4);
      row-gap: var(--joist-space-1);
      align-items: center;
      height: 100%;
      padding: var(--joist-space-4) var(--joist-space-8) var(--joist-space-4) var(--joist-space-4);
      border: 1px solid var(--joist-line);
      border-radius: var(--joist-radius-md);
      background: var(--joist-surface);
      color: var(--joist-ink);
      text-decoration: none;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }

    .tile:hover {
      border-color: var(--joist-ink);
      box-shadow: inset 0 -4px 0 var(--joist-hivis-500);
      color: var(--joist-ink);
    }

    .tile:focus-visible {
      outline: 2px solid var(--joist-focus);
      outline-offset: 2px;
    }

    .tile__icon {
      grid-area: icon;
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: var(--joist-radius-sm);
      background: var(--joist-hivis-500);
      color: var(--joist-graphite-900);
      font-size: 1.25rem;
    }

    .tile__name {
      grid-area: name;
      font-family: var(--joist-font-display);
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.2;
      text-transform: uppercase;
    }

    .tile__detail {
      grid-area: detail;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: var(--joist-ink-muted);
    }

    .tile__arrow {
      position: absolute;
      inset-inline-end: var(--joist-space-4);
      top: 50%;
      transform: translateY(-50%);
      color: var(--joist-ink-muted);
    }

    .tile:hover .tile__arrow {
      color: var(--joist-ink);
    }

    @media (prefers-reduced-motion: reduce) {
      .tile {
        transition: none;
      }
    }
  `,
})
export class JoistDepartments {
  protected readonly departments = JOIST_DEPARTMENTS;
}
