import { NgModule } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';

const formGroup: FormGroup = new FormGroup({});
formGroup.addControl('some-field', new FormControl(''));
const formGroupDirectiveMock: FormGroupDirective = new FormGroupDirective(
  [],
  []
);
formGroupDirectiveMock.form = formGroup;

@NgModule({
  providers: [{ provide: ControlContainer, useValue: formGroupDirectiveMock }],
})
export class NdfControlContainerMockModule {}
