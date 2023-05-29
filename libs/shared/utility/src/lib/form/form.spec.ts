import { FormControl } from '@angular/forms';

import type { FormFieldValidate } from '@ng-dynamic-form/shared/models';

import { formErrorParser } from './form-error-parser';
import { formValidationSet } from './form-validation-set';

const scenarios: {
  field: FormFieldValidate;
  isError: boolean;
  patchValue?: FormFieldValidate['value'];
}[] = [
  {
    field: { name: 'required' },
    isError: true
  },
  {
    field: { name: 'required' },
    isError: false,
    patchValue: 'test'
  },
  {
    field: { name: 'max', value: 10 },
    isError: false,
    patchValue: 9
  },
  {
    field: { name: 'max', value: 10 },
    isError: true,
    patchValue: 11
  },
  {
    field: { name: 'min', value: 10 },
    isError: true,
    patchValue: 9
  },
  {
    field: { name: 'min', value: 10 },
    isError: false,
    patchValue: 11
  },
  {
    field: { name: 'minLength', value: 10 },
    isError: true,
    patchValue: '#'.repeat(9)
  },
  {
    field: { name: 'minLength', value: 10 },
    isError: false,
    patchValue: '#'.repeat(11)
  },
  {
    field: { name: 'maxLength', value: 10 },
    isError: false,
    patchValue: '#'.repeat(9)
  },
  {
    field: { name: 'maxLength', value: 10 },
    isError: true,
    patchValue: '#'.repeat(11)
  },
  {
    field: { name: 'pattern', value: '([0-9]*)' },
    isError: false,
    patchValue: 1
  },
  {
    field: { name: 'pattern', value: '^([^0-9]*)$' },
    isError: true,
    patchValue: 1
  }
];

describe('form utilities', () => {
  for (const { field, isError, patchValue } of scenarios) {
    const { name, value } = field;
    it(`should return ${
      isError ? 'error with the actual' : 'empty object'
    } value when we update the control with the value ${patchValue} for the ${name} validator`, () => {
      const validator = formValidationSet([{ name, value }]);

      const control: FormControl = new FormControl();

      control.addValidators(validator);
      control.patchValue(patchValue, {
        emitEvent: true,
        onlySelf: true
      });
      control.updateValueAndValidity();

      const { key, value: parsedValue } = formErrorParser(control);

      expect(key).toEqual(isError ? name.toLowerCase() : '');
      expect(parsedValue).toEqual(isError ? value : '');
    });
  }
});
