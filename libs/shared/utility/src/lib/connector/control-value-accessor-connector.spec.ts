import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ControlValueAccessorConnectorComponent } from './control-value-accessor-connector';

describe('ControlValueAccessorConnectorComponent', () => {
  let spectator: Spectator<ControlValueAccessorConnectorComponent>;
  const createComponent = createComponentFactory({
    component: ControlValueAccessorConnectorComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
