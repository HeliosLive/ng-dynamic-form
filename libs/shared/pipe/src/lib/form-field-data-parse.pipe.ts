import { Pipe, PipeTransform } from '@angular/core';

import type {
  BasicListDataItem,
  FormValueData
} from '@ng-dynamic-form/shared/models';

@Pipe({
  name: 'formFieldDataParse',
  standalone: true
})
export class FormFieldDataParsePipe implements PipeTransform {
  transform(
    data: FormValueData['fields'],
    field: string
  ): BasicListDataItem[] | undefined {
    return data.find((elem) => elem.name === field)?.data ?? undefined;
  }
}
