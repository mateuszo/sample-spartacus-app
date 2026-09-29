import { ChangeDetectionStrategy, Component } from '@angular/core';

interface JoistService {
  readonly title: string;
  readonly detail: string;
  readonly icon: string;
}

/** Depot services strip (replaces the CMS Section4 banners). */
@Component({
  selector: 'app-joist-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="services" aria-labelledby="services-title">
      <h2 id="services-title" class="services__title">At every Joist depot</h2>
      <ul class="services__list">
        @for (service of services; track service.title) {
          <li class="service">
            <span class="service__icon fa-solid {{ service.icon }}" aria-hidden="true"></span>
            <h3 class="service__name">{{ service.title }}</h3>
            <p class="service__detail">{{ service.detail }}</p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      background: var(--joist-graphite-900);
      color: var(--joist-ink-inverse);
    }

    .services {
      max-width: var(--cx-page-width-max);
      margin-inline: auto;
      padding: var(--joist-space-12) var(--joist-space-4);
    }

    .services__title {
      margin: 0 0 var(--joist-space-8);
      font-family: var(--joist-font-display);
      font-size: 2rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .services__list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--joist-space-6);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .service {
      padding-top: var(--joist-space-4);
      border-top: 4px solid var(--joist-hivis-500);
    }

    .service__icon {
      font-size: 1.5rem;
      color: var(--joist-hivis-500);
    }

    .service__name {
      margin: var(--joist-space-3) 0 var(--joist-space-2);
      font-family: var(--joist-font-display);
      font-size: 1.375rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--joist-ink-inverse);
    }

    .service__detail {
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.5;
      color: var(--joist-concrete-300);
    }
  `,
})
export class JoistServices {
  protected readonly services: readonly JoistService[] = [
    {
      title: 'Cut to size',
      detail: 'Timber and sheet cut to your measurements while you wait, accurate to 1 mm.',
      icon: 'fa-scissors',
    },
    {
      title: 'Click & collect',
      detail: 'Order online and collect from the trade counter in 2 hours.',
      icon: 'fa-store',
    },
    {
      title: 'Next-day delivery',
      detail: 'Order by 17:00 for next-day delivery. Free over £75 to most UK postcodes.',
      icon: 'fa-truck',
    },
    {
      title: '30-day returns',
      detail: 'Over-ordered? Bring back unused stock within 30 days for a refund.',
      icon: 'fa-rotate-left',
    },
  ];
}
