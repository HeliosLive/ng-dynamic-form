import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFormFieldConnectorComponent } from '@ng-dynamic-form/shared/utility';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent)
    }
  ],
  selector: 'ndf-ui-dropdown',
  styleUrls: ['./dropdown.component.scss'],
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent extends BaseFormFieldConnectorComponent {}
