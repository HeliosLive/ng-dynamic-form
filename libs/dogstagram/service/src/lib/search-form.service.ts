import { Injectable } from '@angular/core';

import { BehaviorSubject, tap } from 'rxjs';

import type {
  FormField,
  FormFieldActionDataRole,
  FormTile,
  FormValueData
} from '@ng-dynamic-form/shared/models';
import { DataReOrder } from '@ng-dynamic-form/shared/utility';

@Injectable({
  providedIn: 'root'
})
export class SearchFormService {
  private valueData = new BehaviorSubject<FormValueData[]>([]);
  valueData$ = this.valueData.asObservable();
  private formData = new BehaviorSubject<FormTile[]>([]);
  formData$ = this.formData.asObservable();

  getValueData(): void {
    const backendValueData: { values: FormValueData[] } = {
      values: [
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
              name: 'criteria'
            }
          ],
          tile: 'agreement'
        },
        {
          fields: [
            {
              data: [
                {
                  disabled: true,
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
            },
            {
              data: [
                {
                  disabled: true,
                  text: 'bad',
                  value: 1
                },
                {
                  text: 'good',
                  value: 2
                },
                {
                  text: 'unknown',
                  value: 3
                }
              ],
              name: 'quality'
            }
          ],
          tile: 'user'
        }
      ]
    };

    this.valueData.next(backendValueData.values);
  }

  getFormData(): void {
    const backendFormData: { tiles: FormTile[] } = {
      tiles: [
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
              validators: [
                { name: 'required' },
                { name: 'pattern', value: '([0-9]*)' }
              ],
              visible: true
            },
            {
              disable: false,
              group: 'array',
              name: 'customer',
              nesting: [
                {
                  disable: false,
                  name: 'email',
                  order: 1,
                  type: 'textbox',
                  validators: [{ name: 'required' }],
                  visible: true
                },
                {
                  disable: false,
                  name: 'age',
                  order: 1,
                  type: 'textbox',
                  validators: [{ name: 'pattern', value: '([0-9]*)' }],
                  value: '1asd',
                  visible: true
                },
                {
                  disable: false,
                  name: 'custom1',
                  order: 3,
                  type: 'textbox',
                  validators: [{ name: 'pattern', value: '([0-9]*)' }],
                  value: 1,
                  visible: true
                },
                {
                  disable: false,
                  name: 'custom2',
                  order: 3,
                  type: 'textbox',
                  validators: [{ name: 'pattern', value: '([0-9]*)' }],
                  value: 1,
                  visible: true
                },
                {
                  disable: false,
                  name: 'custom3',
                  order: 3,
                  type: 'textbox',
                  validators: [{ name: 'pattern', value: '([0-9]*)' }],
                  value: 1,
                  visible: true
                },
                {
                  disable: false,
                  name: 'age',
                  order: 2,
                  type: 'textbox',
                  validators: [{ name: 'pattern', value: '([0-9]*)' }],
                  value: 1,
                  visible: true
                }
              ],
              order: 3,
              type: 'table',
              visible: true
            }
          ],
          order: 2,
          title: 'agreement',
          visible: true
        },
        {
          fields: [
            {
              disable: false,
              group: 'single',
              name: 'cost',
              order: 3,
              type: 'radio',
              value: 1,
              visible: true
            },
            {
              disable: false,
              group: 'single',
              name: 'kind',
              order: 2,
              relations: [
                {
                  data: [
                    {
                      value: 'rabobank'
                    }
                  ],
                  field: 'name',
                  type: 'required'
                }
              ],
              type: 'textbox',
              validators: [
                { name: 'required' },
                { name: 'maxLength', value: 10 },
                { name: 'max', value: 101 },
                { name: 'pattern', value: '([^0-9]*)' }
              ],
              visible: true
            },
            {
              actions: [
                {
                  data: [
                    {
                      role: 'disable',
                      value: ['rabobank']
                    },
                    {
                      role: 'hide',
                      value: ['others']
                    }
                  ],
                  field: 'quality',
                  type: 'include'
                }
              ],
              autoSet: [
                {
                  data: [
                    {
                      set: 1,
                      value: ['rabobank']
                    },
                    {
                      set: 3,
                      value: ['others']
                    }
                  ],
                  field: 'quality',
                  type: 'include'
                }
              ],
              disable: false,
              group: 'single',
              name: 'name',
              order: 1,
              relations: [
                {
                  data: [
                    {
                      acceptable: ['indeed', 'superb'],
                      value: 'rabobank'
                    }
                  ],
                  field: 'kind',
                  type: 'include'
                }
              ],
              type: 'textbox',
              validators: [
                { name: 'minLength', value: 7 },
                { name: 'pattern', value: '([^0-9]*)' }
              ],
              value: 'asdf',
              visible: true
            },
            {
              disable: false,
              group: 'single',
              name: 'news',
              order: 5,
              relations: [
                {
                  data: [
                    {
                      unacceptable: [2],
                      value: true
                    }
                  ],
                  field: 'quality',
                  type: 'include'
                }
              ],
              type: 'checkbox',
              value: false,
              visible: true
            },
            {
              autoSet: [
                {
                  data: [
                    {
                      set: 1,
                      value: [1, 2]
                    },
                    {
                      set: 3,
                      value: [3]
                    }
                  ],
                  field: 'cost',
                  type: 'include'
                },
                {
                  data: [
                    {
                      set: 11,
                      value: [1, 2]
                    },
                    {
                      set: 33,
                      value: [3]
                    }
                  ],
                  field: 'age',
                  parentField: 'customer',
                  type: 'include'
                }
              ],
              disable: false,
              group: 'single',
              name: 'quality',
              order: 4,
              relations: [
                {
                  data: [
                    {
                      acceptable: [1, 2],
                      value: 1
                    },
                    {
                      acceptable: [1],
                      value: 2
                    },
                    {
                      acceptable: [3],
                      value: 3
                    }
                  ],
                  field: 'cost',
                  type: 'include'
                },
                {
                  data: [
                    {
                      unacceptable: ['party'],
                      value: 1
                    },
                    {
                      acceptable: ['lunch time'],
                      value: 2
                    },
                    {
                      acceptable: ['rabobank'],
                      value: 3
                    }
                  ],
                  field: 'kind',
                  type: 'include'
                }
              ],
              type: 'dropdown',
              visible: true
            }
          ],
          order: 1,
          title: 'user',
          visible: true
        }
      ]
    };

    const mappedBackendFormData = DataReOrder<FormTile>(
      backendFormData.tiles,
      'order',
      'ASC'
    ).map((tile) => {
      return {
        ...tile,
        ...DataReOrder<FormField>(tile.fields, 'order', 'ASC')
      };
    });

    this.formData.next(mappedBackendFormData);
  }

  // ! TO DO: it doesn't work try again with signal mutate
  // signal effect does not work on other classes constructor but we can merge both files to manage?
  setVisibilityAction(param: {
    data: Exclude<FormFieldActionDataRole, 'enable' | 'disable'>;
    field?: string;
    tile: string;
  }): void {
    const { data, field, tile } = param;

    this.formData$.pipe(
      tap((obj: FormTile[]) => {
        const tileData = obj.find((element) => element.title === tile);

        if (!tileData) return;

        const visibility = data === 'show';

        if (!field) {
          tileData.visible = visibility;
        } else {
          const fieldData = tileData.fields.find((val) => val.name === field);

          if (!fieldData) return;

          fieldData.visible = visibility;
        }

        this.formData.next({ ...obj, ...tileData });
      })
    );
  }
}
