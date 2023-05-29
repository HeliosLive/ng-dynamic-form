import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import {
  FormFieldDataParsePipe,
  FormTileValueFilterPipe
} from '@ng-dynamic-form/shared/pipe';

import { NdfCheckboxModule } from '../form-field/checkbox/checkbox.module';
import { NdfDropdownModule } from '../form-field/dropdown/dropdown.module';
import { NdfRadioModule } from '../form-field/radio/radio.module';
import { NdfTextboxModule } from '../form-field/textbox/textbox.module';

import { DynamicFormComponent } from './dynamic-form.component';

@NgModule({
  declarations: [DynamicFormComponent],
  exports: [DynamicFormComponent],
  imports: [
    CommonModule,

    // Form
    FormsModule,
    ReactiveFormsModule,
    // Translation
    TranslateModule,

    // Custom Pipes
    FormFieldDataParsePipe,
    FormTileValueFilterPipe,

    // Custom Form Fields
    NdfRadioModule,
    NdfCheckboxModule,
    NdfDropdownModule,
    NdfTextboxModule
  ]
})
export class NdfDynamicFormModule {}
