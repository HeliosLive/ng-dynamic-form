import { NgModule } from '@angular/core';

import {
  NdfLanguageModule,
  NdfSvgRegisterModule
} from '@ng-dynamic-form/shared/core';

@NgModule({
  imports: [NdfLanguageModule, NdfSvgRegisterModule]
})
export class CoreModule {}
