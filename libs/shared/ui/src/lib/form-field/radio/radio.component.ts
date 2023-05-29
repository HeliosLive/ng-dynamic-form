import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFormFieldConnectorComponent } from '@ng-dynamic-form/shared/utility';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent)
    }
  ],
  selector: 'ndf-ui-radio',
  styleUrls: ['./radio.component.scss'],
  templateUrl: './radio.component.html'
})
export class RadioComponent extends BaseFormFieldConnectorComponent {}
