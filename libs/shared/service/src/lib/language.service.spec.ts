import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { TranslateService } from '@ngx-translate/core';

import { Language } from '@ng-dynamic-form/shared/models';

import { LanguageService } from './language.service';
import { TokenStorageService } from './token-storage.service';

describe('LanguageService', () => {
  let spectator: SpectatorService<LanguageService>;
  let translateService: TranslateService;
  let tokenStorageService: TokenStorageService;

  const mockWindow = {
    location: {
      href: 'test/error'
    }
  };

  const createService = createServiceFactory({
    mocks: [TokenStorageService, TranslateService],
    providers: [{ provide: window, useValue: mockWindow }],
    service: LanguageService
  });

  beforeEach(() => {
    spectator = createService();

    translateService = spectator.inject(TranslateService);
    tokenStorageService = spectator.inject(TokenStorageService);

    translateService.use = jest.fn();
    translateService.addLangs = jest.fn();
    tokenStorageService.remove = jest.fn();
    tokenStorageService.set = jest.fn();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('set', () => {
    it('should call addLangs method in translateService with all possible languages', () => {
      jest.spyOn(translateService, 'addLangs');

      const languages = Object.values(Language);

      spectator.service.set();

      expect(translateService.addLangs).toHaveBeenCalled();
      expect(translateService.addLangs).toHaveBeenCalledWith(languages);
    });

    it('should call setDefaultLang method in translateService with the default language', () => {
      jest.spyOn(translateService, 'setDefaultLang');

      spectator.service.set();

      expect(translateService.setDefaultLang).toHaveBeenCalled();
      expect(translateService.setDefaultLang).toHaveBeenCalledWith(
        Language.Default
      );
    });

    it('should call use method in translateService with the browser language if no query param found', () => {
      const lang = Language.Netherland;

      jest.spyOn(translateService, 'use');

      translateService.getBrowserLang = jest.fn(() => lang);

      spectator.service.set();

      expect(translateService.use).toHaveBeenCalled();
      expect(translateService.use).toHaveBeenCalledWith(lang);
    });

    it('should call set method in tokenStorageService with the query param language', () => {
      const lang = Language.Spanish;

      jest.spyOn(tokenStorageService, 'set');
      jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue(lang);

      spectator.service.set();

      expect(tokenStorageService.set).toHaveBeenCalled();
      expect(tokenStorageService.set).toHaveBeenCalledWith('lang', lang);
    });

    for (const [country, lang] of Object.entries(Language)) {
      it(`should call use method in translateService with the ${lang} query param ${country} language`, () => {
        jest.spyOn(translateService, 'use');
        jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue(lang);

        spectator.service.set();

        expect(translateService.use).toHaveBeenCalled();
        expect(translateService.use).toHaveBeenCalledWith(lang);
      });
    }

    it('should call use method in translateService with the default language query param is not acceptable', () => {
      const lang = 'asdf';

      jest.spyOn(translateService, 'use');
      jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue(lang);

      spectator.service.set();

      expect(translateService.use).toHaveBeenCalled();
      expect(translateService.use).not.toHaveBeenCalledWith(lang);
      expect(translateService.use).toHaveBeenCalledWith(Language.Default);
    });
  });

  describe('reset', () => {
    it('should call remove method in tokenStorageService with lang param', () => {
      jest.spyOn(tokenStorageService, 'remove');

      spectator.service.reset();

      expect(tokenStorageService.remove).toHaveBeenCalled();
      expect(tokenStorageService.remove).toHaveBeenCalledWith('lang');
    });
  });
});
