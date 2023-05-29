import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFormFieldConnectorComponent } from '@ng-dynamic-form/shared/utility';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent)
    }
  ],
  selector: 'ndf-ui-checkbox',
  styleUrls: ['./checkbox.component.scss'],
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent extends BaseFormFieldConnectorComponent {}
