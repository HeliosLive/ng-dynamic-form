import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import type { FormValueData } from '@ng-dynamic-form/shared/models';

import { FormFieldDataParsePipe } from './form-field-data-parse.pipe';

describe('FormFieldDataParsePipe', () => {
  const createService = createServiceFactory({
    service: FormFieldDataParsePipe
  });

  let spectator: SpectatorService<FormFieldDataParsePipe>;
  const valueData: FormValueData['fields'] = [
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
  ];

  beforeEach(() => {
    spectator = createService();
  });

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('transform', () => {
    it('should return the data field that matches with the field name', () => {
      const result = spectator.service.transform(valueData, 'criteria');

      expect(result).toEqual(valueData[0].data);
    });

    it('should return undefined if the field name does not match', () => {
      const result = spectator.service.transform(valueData, 'wrong-field-name');

      expect(result).toEqual(undefined);
    });
  });
});
