import { ValidatorFn, Validators } from '@angular/forms';

import type { FormFieldValidate } from '@ng-dynamic-form/shared/models';

export function formValidationSet(fields?: FormFieldValidate[]): ValidatorFn[] {
  const validations: ValidatorFn[] = [];

  fields?.forEach((field) => {
    validations.push(matchFormErrors(field));
  });

  return validations;
}

function matchFormErrors(field: FormFieldValidate): ValidatorFn {
  const { name, value } = field;

  const errors: Readonly<Record<FormFieldValidate['name'], ValidatorFn>> = {
    max: Validators.max(Number(value)),
    maxLength: Validators.maxLength(Number(value)),
    min: Validators.min(Number(value)),
    minLength: Validators.minLength(Number(value)),
    pattern: Validators.pattern(String(value)),
    required: Validators.required
  };

  return errors[name];
}
