import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { STORAGE } from '@ng-dynamic-form/shared/token';

import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let storage: Storage;
  let spectator: SpectatorService<TokenStorageService>;

  const createService = createServiceFactory({
    providers: [{ provide: STORAGE, useValue: {} }],
    service: TokenStorageService
  });

  beforeEach(() => {
    spectator = createService();
    storage = spectator.inject(STORAGE);
  });

  describe('setToken', () => {
    it('should save the key and token in local storage', () => {
      const key = 'key';
      const token = 'token';
      storage.setItem = jest.fn();

      spectator.service.set(key, token);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toBeCalledWith(key, token);
    });
  });

  describe('removeToken', () => {
    it('should remove the token from local storage', () => {
      const key = 'key';
      storage.removeItem = jest.fn();

      spectator.service.remove(key);

      expect(storage.removeItem).toHaveBeenCalledTimes(1);
      expect(storage.removeItem).toBeCalledWith(key);
    });
  });

  describe('getToken', () => {
    it('should return the item in local storage if found', () => {
      const key = 'key';
      const token = 'token';
      storage.getItem = jest.fn(() => token);

      const expectedToken = spectator.service.get(key);

      expect(expectedToken).toEqual(token);
      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toBeCalledWith(key);
    });

    it('should return null if token is not found', () => {
      const key = 'key';
      storage.getItem = jest.fn(() => null);

      const expectedToken = spectator.service.get(key);

      expect(expectedToken).toEqual(null);
      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toBeCalledWith(key);
    });
  });
});
