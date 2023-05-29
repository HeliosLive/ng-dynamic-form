import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

import {
  IModuleTranslationOptions,
  ModuleTranslateLoader,
} from '@larscom/ngx-translate-module-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { initLanguageInitializer } from './init-language.initializer';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: ModuleHttpLoaderFactory,
      },
    }),
  ],
  providers: [initLanguageInitializer],
})
export class NdfLanguageModule {}

export function ModuleHttpLoaderFactory(http: HttpClient) {
  const baseTranslateUrl = 'assets/i18n';

  const options: IModuleTranslationOptions = {
    lowercaseNamespace: true,
    modules: [{ baseTranslateUrl }, { baseTranslateUrl, moduleName: 'shared' }],
    translateError: (error, path) => {
      console.error('Oops! an error occurred: ', { error, path });
    },
    version: Date.now(),
  };
  return new ModuleTranslateLoader(http, options);
}
