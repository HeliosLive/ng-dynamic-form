import { Component, Injector, Input, ViewChild } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective
} from '@angular/forms';

@Component({
  template: ''
})
export class ControlValueAccessorConnectorComponent
  implements ControlValueAccessor
{
  @Input({ required: true }) formControlName!: string;
  @Input() formControl!: FormControl;

  @ViewChild(FormControlDirective, { static: true })
  formControlDirective!: FormControlDirective;

  constructor(private injector: Injector) {}

  get control() {
    return (
      this.formControl ||
      this.controlContainer.control?.get(this.formControlName)
    );
  }

  get controlContainer() {
    return this.injector.get(ControlContainer);
  }

  /* istanbul ignore next */
  registerOnTouched(fn: unknown): void {
    this.valueAccessor()?.registerOnTouched(fn);
  }

  /* istanbul ignore next */
  registerOnChange(fn: unknown): void {
    this.valueAccessor()?.registerOnChange(fn);
  }

  /* istanbul ignore next */
  writeValue(obj: unknown): void {
    this.valueAccessor()?.writeValue(obj);
  }

  /* istanbul ignore next */
  setDisabledState(isDisabled: boolean): void {
    this.valueAccessor()?.setDisabledState?.(isDisabled);
  }

  /* istanbul ignore next */
  private valueAccessor(): ControlValueAccessor | null {
    return this.formControlDirective?.valueAccessor;
  }
}
