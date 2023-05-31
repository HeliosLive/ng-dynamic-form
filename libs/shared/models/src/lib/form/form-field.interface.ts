export type FormFieldInput =
  | 'textbox'
  | 'dropdown'
  | 'radio'
  | 'checkbox'
  | 'table';

// ! TO DO: add 'replaceable' option to set the value later on when depends on the other fields
export type FormFieldAcceptableValue = string | number | boolean;

export interface FormFieldValidate {
  name: 'required' | 'min' | 'minLength' | 'max' | 'maxLength' | 'pattern';
  value?: FormFieldAcceptableValue;
}

export type FormFieldActionDataRole = 'disable' | 'enable' | 'show' | 'hide';

export type FormFieldComparison =
  | 'include'
  | 'equal'
  | 'greater'
  | 'less'
  | 'required';

export interface FormFieldRelation {
  data: {
    acceptable?: FormFieldAcceptableValue[];
    unacceptable?: FormFieldAcceptableValue[];
    value: FormFieldAcceptableValue;
  }[];
  field: string;
  type: FormFieldComparison;
}

export interface FormFieldAutoSetData {
  overwrite?: boolean;
  set: FormFieldAcceptableValue;
  value: FormFieldAcceptableValue[];
}

export interface FormFieldAutoSet {
  data: FormFieldAutoSetData[];
  field: string;
  parentField?: string;
  type: Exclude<FormFieldComparison, 'required'>;
}

export interface FormFieldAction {
  data: {
    role: FormFieldActionDataRole;
    value: FormFieldAcceptableValue[];
  }[];
  field: string;
  type: FormFieldComparison;
}

export type FormFieldGroup = 'single' | 'array';

export interface FormField {
  actions?: FormFieldAction[];
  autoSet?: FormFieldAutoSet[];
  disable: boolean;
  group?: FormFieldGroup;
  isHint?: boolean;
  name: string;
  nesting?: FormField[];
  order: number;
  relations?: FormFieldRelation[];
  type: FormFieldInput;
  validators?: FormFieldValidate[];
  value?: FormFieldAcceptableValue | FormFieldAcceptableValue[];
  visible: boolean;
}
