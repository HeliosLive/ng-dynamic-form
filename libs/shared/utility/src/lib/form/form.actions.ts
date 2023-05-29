import { ValidatorFn } from '@angular/forms';

import type {
  FormFieldComparison,
  FormFieldRelation
} from '@ng-dynamic-form/shared/models';
import { CompareValuesCheckValidator } from '@ng-dynamic-form/shared/validator';

export const formActions = (data: {
  data: FormFieldRelation['data'];
  parentField: string;
  type: FormFieldComparison;
}): ValidatorFn => {
  return CompareValuesCheckValidator(data);
};
