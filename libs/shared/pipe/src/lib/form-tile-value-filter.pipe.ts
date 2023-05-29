import { Pipe, PipeTransform } from '@angular/core';

import type { FormValueData } from '@ng-dynamic-form/shared/models';

@Pipe({
  name: 'formTileValueFilter',
  standalone: true
})
export class FormTileValueFilterPipe implements PipeTransform {
  transform(data: FormValueData[] | null, tile: string) {
    return data ? data.find((elem) => elem.tile === tile) : null;
  }
}
