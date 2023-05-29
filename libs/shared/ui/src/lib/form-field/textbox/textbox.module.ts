import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { TextboxComponent } from './textbox.component';

@NgModule({
  declarations: [TextboxComponent],
  exports: [TextboxComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
})
export class NdfTextboxModule {}
