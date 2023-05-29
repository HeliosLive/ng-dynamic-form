import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators
} from '@angular/forms';

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateService } from '@ngx-translate/core';

import type { BasicListDataItem } from '@ng-dynamic-form/shared/models';

import { BaseFormFieldConnectorComponent } from './base-form-field-connector';

describe('BaseFormFieldConnectorComponent', () => {
  let spectator: Spectator<BaseFormFieldConnectorComponent>;
  let translateService: TranslateService;

  const prefix = 'facility';
  const field = 'email';
  const tile = 'currency';
  const getTranslatedTextPrefix = `${prefix}.form.${tile}.tile.${field}`;

  const formGroup: FormGroup = new FormGroup({});
  formGroup.addControl(field, new FormControl(''));
  const formControl = <FormControl>formGroup.get(`${field}`);
  const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
  formGroupDirective.form = formGroup;

  const createComponent = createComponentFactory({
    component: BaseFormFieldConnectorComponent,
    mocks: [TranslateService],
    providers: [{ provide: ControlContainer, useValue: formGroupDirective }],
    shallow: true
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        field,
        formControlName: field,
        prefix,
        tile
      }
    });

    translateService = spectator.inject(TranslateService);

    translateService.instant = jest.fn((param: string) => param);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should return the default item for the component', () => {
    const expectation: BasicListDataItem = {
      disabled: true,
      text: spectator.component.formPlaceholderText,
      value: ''
    };

    spectator.component.ngOnInit();

    expect(spectator.component.defaultItem).toEqual(expectation);
  });

  it('should call the markAsUntouched method inside onFocus', () => {
    jest.spyOn(formControl, 'markAsUntouched');

    spectator.component.onFocus();

    expect(formControl.markAsUntouched).toHaveBeenCalled();
  });

  it('should call the markAsPristine method inside onChange', () => {
    jest.spyOn(formControl, 'markAsPristine');

    spectator.component.onChange();

    expect(formControl.markAsPristine).toHaveBeenCalled();
  });

  it('should call the markAsTouched method inside onBlur', () => {
    jest.spyOn(formControl, 'markAsTouched');

    spectator.component.onBlur();

    expect(formControl.markAsTouched).toHaveBeenCalled();
  });

  describe('itemDisabled', () => {
    const itemArgs = {
      dataItem: {
        text: 'some title',
        value: 1
      },
      index: 1
    };

    it('should return false if item has no disabled property', () => {
      const result = spectator.component.itemDisabled(itemArgs);

      expect(result).toEqual(false);
    });

    it('should return the field disabled in item', () => {
      const newItemArgs = {
        ...itemArgs,
        dataItem: { ...itemArgs.dataItem, disabled: true }
      };
      const result = spectator.component.itemDisabled(newItemArgs);

      expect(result).toEqual(true);
    });
  });

  describe('getFormText', () => {
    it('should return the translated text of the label', () => {
      expect(spectator.component.formLabelText).toEqual(
        `${getTranslatedTextPrefix}.label`
      );
    });

    it('should return the translated text of the hint', () => {
      expect(spectator.component.formHintText).toEqual(
        `${getTranslatedTextPrefix}.hint`
      );
    });

    it('should return the translated text of the error', () => {
      formControl?.addValidators(Validators.required);
      formControl?.updateValueAndValidity();

      expect(spectator.component.formErrorText).toEqual(
        `${getTranslatedTextPrefix}.error.required`
      );
    });

    it('should return the translated text of the placeholder', () => {
      expect(spectator.component.formPlaceholderText).toEqual(
        `${getTranslatedTextPrefix}.placeholder`
      );
    });
  });
});
