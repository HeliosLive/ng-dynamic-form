import { FormControl, ValidationErrors } from '@angular/forms';

import type { FormValidationError } from '@ng-dynamic-form/shared/models';

export function formErrorParser(
  control: FormControl<unknown>
): FormValidationError {
  const errors: ValidationErrors | null = control?.errors;

  if (!errors)
    return {
      key: '',
      value: ''
    };

  const [key, valueObj] = Object.entries(errors)[0];
  const value = Object.entries(valueObj)[0]?.[1];

  return { key, value };
}
