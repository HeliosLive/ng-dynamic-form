import { NgModule } from '@angular/core';

import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';

import { sharedIcons } from './shared-icons';

@NgModule({
  imports: [AngularSvgIconModule.forRoot()],
})
export class NdfSvgRegisterModule {
  constructor(private iconReg: SvgIconRegistryService) {
    /* shared */
    this.iconReg
      .loadSvg(`assets/svg/icon/${sharedIcons.cancel}.svg`, sharedIcons.cancel)
      ?.subscribe();
    this.iconReg
      .loadSvg(
        `assets/svg/icon/${sharedIcons.loading}.svg`,
        sharedIcons.loading
      )
      ?.subscribe();
    this.iconReg
      .loadSvg(
        `assets/svg/icon/${sharedIcons.checkbox}.svg`,
        sharedIcons.checkbox
      )
      ?.subscribe();
  }
}
