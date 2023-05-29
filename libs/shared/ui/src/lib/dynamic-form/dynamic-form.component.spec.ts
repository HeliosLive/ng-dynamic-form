import { FormGroup } from '@angular/forms';

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import type { FormTile, FormValueData } from '@ng-dynamic-form/shared/models';
import { NdfDynamicFormBuilderService } from '@ng-dynamic-form/shared/service';

import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
  let spectator: Spectator<DynamicFormComponent>;

  const valueData: Observable<FormValueData[]> = of([
    {
      fields: [
        {
          data: [
            {
              text: 'low',
              value: 1
            },
            {
              text: 'medium',
              value: 2
            },
            {
              text: 'high',
              value: 3
            }
          ],
          name: 'cost'
        }
      ],
      tile: 'user'
    }
  ]);
  const tileData: Observable<FormTile[]> = of([
    {
      fields: [
        {
          disable: false,
          group: 'single',
          name: 'criteria',
          order: 1,
          type: 'radio',
          value: 1,
          visible: true
        },
        {
          disable: false,
          group: 'single',
          name: 'amount',
          order: 2,
          type: 'textbox',
          validators: [{ name: 'required' }],
          visible: true
        }
      ],
      order: 2,
      title: 'agreement',
      visible: true
    }
  ]);
  const form: FormGroup = new FormGroup({});

  const createComponent = createComponentFactory({
    component: DynamicFormComponent,
    mocks: [TranslateService, NdfDynamicFormBuilderService],
    shallow: true
  });
  beforeEach(() => {
    spectator = createComponent({
      props: {
        form,
        formData$: tileData,
        valueData$: valueData
      }
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
