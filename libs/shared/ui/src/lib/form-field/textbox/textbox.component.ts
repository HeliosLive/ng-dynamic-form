import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFormFieldConnectorComponent } from '@ng-dynamic-form/shared/utility';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextboxComponent)
    }
  ],
  selector: 'ndf-ui-textbox',
  styleUrls: ['./textbox.component.scss'],
  templateUrl: './textbox.component.html'
})
export class TextboxComponent extends BaseFormFieldConnectorComponent {}
