import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateService } from '@ngx-translate/core';

import { NdfControlContainerMockModule } from '../+testing';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let spectator: Spectator<CheckboxComponent>;
  let translateService: TranslateService;

  const createComponent = createComponentFactory({
    component: CheckboxComponent,
    imports: [NdfControlContainerMockModule],
    mocks: [TranslateService],
    shallow: true,
  });
  beforeEach(() => {
    spectator = createComponent();

    translateService = spectator.inject(TranslateService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();

    translateService.instant = jest.fn((param: string) => param);
  });
});
