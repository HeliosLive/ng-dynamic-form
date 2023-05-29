import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Injector,
  Input,
  OnInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import type { BasicListDataItem } from '@ng-dynamic-form/shared/models';

import { formErrorParser } from '../form/form-error-parser';

import { ControlValueAccessorConnectorComponent } from './control-value-accessor-connector';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseFormFieldConnectorComponent)
    }
  ],
  standalone: true,
  template: ''
})
export class BaseFormFieldConnectorComponent
  extends ControlValueAccessorConnectorComponent
  implements OnInit
{
  @Input({ required: true }) prefix!: string;
  @Input({ required: true }) field!: string;
  @Input({ required: true }) tile!: string;
  @Input() data?: BasicListDataItem[];
  @Input() isHint?: boolean;

  randomId = Math.random().toString(36).substring(7);
  defaultItem!: BasicListDataItem;
  virtual = {
    itemHeight: 10
  };

  constructor(injector: Injector, private translateService: TranslateService) {
    super(injector);
  }

  ngOnInit(): void {
    this.setDefaultItemData();
  }

  get formLabelText(): string {
    return this.getFormText('label');
  }

  get formPlaceholderText(): string {
    return this.getFormText('placeholder');
  }

  get formHintText(): string {
    return this.getFormText('hint');
  }

  get formErrorText(): string {
    const { key, value } = formErrorParser(this.control);
    return this.getFormText('error', key, value);
  }

  onBlur(): void {
    this.control.markAsTouched();
  }

  onFocus(): void {
    this.control.markAsUntouched();
  }

  onChange(): void {
    this.control.markAsPristine();
  }

  itemDisabled(itemArgs: {
    dataItem: BasicListDataItem;
    index: number;
  }): boolean {
    return itemArgs.dataItem.disabled ?? false;
  }

  private getFormText(
    param: 'label' | 'placeholder' | 'hint' | 'error',
    key?: string,
    value?: unknown
  ): string {
    return this.translateService.instant(
      `${this.getTranslatedTextPrefix()}.${param}${key ? '.' + key : ''}`,
      { value }
    );
  }

  private setDefaultItemData(): void {
    this.defaultItem = {
      disabled: true,
      text: this.translateService.instant(
        `${this.getTranslatedTextPrefix()}.placeholder`
      ),
      value: ''
    };
  }

  private getTranslatedTextPrefix(): string {
    return `${this.prefix}.form.${this.tile}.tile.${this.field}`;
  }
}
