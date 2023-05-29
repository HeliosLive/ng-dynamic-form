import { fakeAsync, tick } from '@angular/core/testing';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import type { Theme } from '@ng-dynamic-form/shared/models';

import { NdfThemeService } from './theme.service';

describe('NdfThemeService', () => {
  let spectator: SpectatorService<NdfThemeService>;
  const mockWindow = {
    matchMedia: jest.fn((param: string) => {
      return param;
    })
  };

  const createService = createServiceFactory({
    providers: [{ provide: window, useValue: mockWindow }],
    service: NdfThemeService
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('initialize', () => {
    it('should set the light theme if schema does not match', () => {
      matchMediaDefineProperty(false);

      spectator.service.initialize();

      expect(getThemeAttribute()).toBe('light');
    });

    it('should set the dark theme if schema matches', () => {
      matchMediaDefineProperty(true);

      spectator.service.initialize();

      expect(getThemeAttribute()).toBe('dark');
    });

    it('should set the subject with correct value', fakeAsync(() => {
      matchMediaDefineProperty(true);

      spectator.service.initialize();

      spectator.service.data$.subscribe((value: Theme) => {
        expect(value).not.toBe('light');
        expect(value).toBe('dark');
      });
      tick();
    }));
  });

  function getThemeAttribute() {
    return document.documentElement.getAttribute('data-theme');
  }

  function matchMediaDefineProperty(matches: boolean) {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation((query) => ({
        addEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
        matches,
        media: query,
        onchange: null,
        removeEventListener: jest.fn()
      })),
      writable: true
    });
  }
});
