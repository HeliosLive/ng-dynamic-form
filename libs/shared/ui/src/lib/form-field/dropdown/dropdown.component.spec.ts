import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateService } from '@ngx-translate/core';

import { NdfControlContainerMockModule } from '../+testing';

import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let spectator: Spectator<DropdownComponent>;
  let translateService: TranslateService;

  const createComponent = createComponentFactory({
    component: DropdownComponent,
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
