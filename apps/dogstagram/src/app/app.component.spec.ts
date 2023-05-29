import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { NdfThemeService } from '@ng-dynamic-form/shared/service';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let ndfThemeService: NdfThemeService;

  const createComponent = createComponentFactory({
    component: AppComponent,
    mocks: [NdfThemeService],
    shallow: true
  });
  beforeEach(() => {
    spectator = createComponent();

    ndfThemeService = spectator.inject(NdfThemeService);

    ndfThemeService.initialize = jest.fn();
    ndfThemeService.listen = jest.fn();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should call theme service methods for setting the theme', () => {
    jest.spyOn(ndfThemeService, 'initialize');
    jest.spyOn(ndfThemeService, 'listen');

    spectator.component.ngOnInit();

    expect(ndfThemeService.initialize).toHaveBeenCalled();
    expect(ndfThemeService.listen).toHaveBeenCalled();
  });
});
