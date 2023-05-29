import type { BasicListDataItem } from '../data';

export interface FormValueData {
  fields: {
    data: BasicListDataItem[];
    name: string;
  }[];
  tile: string;
}
