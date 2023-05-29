import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import type {
  FormFieldComparison,
  FormFieldRelation
} from '@ng-dynamic-form/shared/models';

export function CompareValuesCheckValidator(values: {
  data: FormFieldRelation['data'];
  parentField: string;
  type: FormFieldComparison;
}): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const childControlValue = control.value;

    if (!childControlValue) {
      return null;
    }

    const { data, type, parentField } = values;
    const parentControl = control.parent?.get(parentField);

    if (!parentControl) return null;

    const parentControlValue = parentControl?.value;
    const filteredData = data.find(
      (check) => check.value === parentControlValue
    );

    if (!filteredData) return null;

    const { acceptable, unacceptable } = filteredData;

    const isUnacceptable = unacceptable?.some((val) =>
      isComparisonSatisfied(val, type, childControlValue)
    );

    const isAcceptable = acceptable?.some((val) =>
      isComparisonSatisfied(val, type, childControlValue)
    );

    return isUnacceptable || !isAcceptable
      ? { [getErrorKey(type)]: { requiredValue: parentField } }
      : null;
  };
}

function getErrorKey(type: FormFieldComparison): string {
  const errorKeyMap: Record<FormFieldComparison, string> = {
    equal: 'equalCheck',
    greater: 'greaterThanCheck',
    include: 'includeCheck',
    less: 'lessThanCheck',
    required: 'requiredCheck'
  };

  return errorKeyMap[type] || '';
}

function isComparisonSatisfied(
  val: string | number | boolean,
  type: FormFieldComparison,
  childControlValue: string | number | boolean
): boolean {
  switch (type) {
    case 'greater':
      return val > childControlValue;
    case 'less':
      return val < childControlValue;
    case 'include':
    case 'required':
    case 'equal':
      return val === childControlValue;

    default:
      return false;
  }
}
