import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { ProfileFormService } from './profile-form.service';

describe('ProfileFormService', () => {
  let spectator: SpectatorService<ProfileFormService>;

  const createService = createServiceFactory({
    service: ProfileFormService
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
