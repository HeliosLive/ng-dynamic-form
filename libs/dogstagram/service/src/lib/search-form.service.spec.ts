import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { SearchFormService } from './search-form.service';

describe('SearchFormService', () => {
  let spectator: SpectatorService<SearchFormService>;

  const createService = createServiceFactory({
    service: SearchFormService
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
