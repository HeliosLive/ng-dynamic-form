import { APP_INITIALIZER } from '@angular/core';

import { LanguageService } from '@ng-dynamic-form/shared/service';

function checkLanguageFactory(languageService: LanguageService) {
  return () => {
    languageService.set();
  };
}
export const initLanguageInitializer = {
  deps: [LanguageService],
  multi: true,
  provide: APP_INITIALIZER,
  useFactory: checkLanguageFactory
};
