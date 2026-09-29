import { NgModule } from '@angular/core';
import { translationChunksConfig, translationsEn } from '@spartacus/assets';
import {
  AuthConfig,
  FeaturesConfig,
  I18nConfig,
  OccConfig,
  provideConfig,
  provideConfigFactory,
  SiteContextConfig,
} from '@spartacus/core';
import {
  defaultCmsContentProviders,
  layoutConfigFactory,
  mediaConfig,
} from '@spartacus/storefront';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    provideConfigFactory(layoutConfigFactory),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    provideConfig(<OccConfig>{
      backend: {
        occ: {
          baseUrl: 'https://your-occ-host.example.com',
        },
      },
    }),
    provideConfig(<AuthConfig>{
      authentication: {
        client_id: 'vuestorefront',
        client_secret: 'your-client-secret',
      }
    }),
    provideConfig(<SiteContextConfig>{
      context: {},
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: translationsEn },
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig(<FeaturesConfig>{
      features: {
        level: '221121.18',
      },
    }),
  ],
})
export class SpartacusConfigurationModule {}
