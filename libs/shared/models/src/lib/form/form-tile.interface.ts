import type { FormField } from './form-field.interface';

export interface FormTile {
  fields: FormField[];
  order: number;
  title: string;
  visible: boolean;
}
