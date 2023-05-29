export type FormFieldInput =
  | 'textbox'
  | 'dropdown'
  | 'radio'
  | 'checkbox'
  | 'table';

export interface FormFieldValidate {
  name: 'required' | 'min' | 'minLength' | 'max' | 'maxLength' | 'pattern';
  value?: string | number | boolean;
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
    acceptable?: (number | string | boolean)[];
    unacceptable?: (number | string | boolean)[];
    value: number | string | boolean;
  }[];
  field: string;
  type: FormFieldComparison;
}

export interface FormFieldAutoSet {
  data: {
    set: number | string | boolean;
    value: (number | string | boolean)[];
  }[];
  field: string;
  parentField?: string;
  type: FormFieldComparison;
}

export interface FormFieldAction {
  data: {
    role: FormFieldActionDataRole;
    value: (number | string | boolean)[];
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
  name: string;
  nesting?: FormField[];
  order: number;
  relations?: FormFieldRelation[];
  type: FormFieldInput;
  validators?: FormFieldValidate[];
  value?: (string | number | boolean) | (string | number | boolean)[];
  visible: boolean;
}
