import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NdfDynamicFormModule } from '@ng-dynamic-form/shared/ui';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, NdfDynamicFormModule]
})
export class ProfileModule {}
