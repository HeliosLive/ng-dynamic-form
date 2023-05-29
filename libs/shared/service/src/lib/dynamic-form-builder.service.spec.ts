import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { NdfDynamicFormBuilderService } from './dynamic-form-builder.service';

describe('NdfDynamicFormBuilderService', () => {
  let spectator: SpectatorService<NdfDynamicFormBuilderService>;

  const createService = createServiceFactory({
    service: NdfDynamicFormBuilderService
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
