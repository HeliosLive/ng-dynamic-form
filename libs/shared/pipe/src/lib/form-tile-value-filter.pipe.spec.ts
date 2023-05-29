import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import type { FormValueData } from '@ng-dynamic-form/shared/models';

import { FormTileValueFilterPipe } from './form-tile-value-filter.pipe';

describe('FormTileValueFilterPipe', () => {
  const createService = createServiceFactory({
    service: FormTileValueFilterPipe
  });

  let spectator: SpectatorService<FormTileValueFilterPipe>;
  const valueData: FormValueData[] = [
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
  ];

  beforeEach(() => {
    spectator = createService();
  });

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('transform', () => {
    it('should return the tile data that matches with the tile name', () => {
      const result = spectator.service.transform(valueData, 'user');

      expect(result).toEqual(valueData[0]);
    });

    it('should return undefined if the tile name does not match', () => {
      const result = spectator.service.transform(valueData, 'wrong-tile-name');

      expect(result).toEqual(undefined);
    });
  });
});
