import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  tap
} from 'rxjs';

import type {
  FormField,
  FormFieldAcceptableValue,
  FormFieldAutoSetData
} from '@ng-dynamic-form/shared/models';
import {
  DataReOrder,
  formActions,
  formValidationSet
} from '@ng-dynamic-form/shared/utility';

type FormUpdateOn = 'change' | 'blur' | 'submit';

@Injectable({
  providedIn: 'root'
})
export class NdfDynamicFormBuilderService {
  private form!: FormGroup;
  private element!: FormField;
  private updateOn!: FormUpdateOn;

  buildForm(
    form: FormGroup,
    element: FormField,
    updateOn?: FormUpdateOn
  ): Observable<unknown | undefined> {
    this.assignVariables(form, element, updateOn);
    this.addFormControls();
    this.addFormArrays();
    this.addFormValidations();
    this.addFormCustomValidators();

    return combineLatest([
      this.listenFormActions(),
      this.listenFormAutoSetValues(),
      this.listenFormControlRelations()
    ]);
  }

  private assignVariables(
    form: FormGroup,
    element: FormField,
    updateOn?: FormUpdateOn
  ): void {
    this.form = form;
    this.element = element;
    this.updateOn = updateOn ?? 'change';
  }

  private addFormControls(): void {
    const { name, group, value } = this.element;
    this.form?.addControl(
      name,
      group === 'array'
        ? new FormArray([])
        : new FormControl(value ?? '', {
            updateOn: this.updateOn
          })
    );
  }

  private addFormArrays(): void {
    const { name, nesting } = this.element;

    if (!nesting) return;

    const field = <FormArray>this.form.get(`${name}`);
    const combinedDataArray = this.collapseNestingData(nesting);

    combinedDataArray.forEach((data: FormField) => {
      const formGroup = new FormGroup({});

      data.nesting?.forEach((element: FormField) => {
        const { name: nestedName, value } = element;

        formGroup.addControl(nestedName, new FormControl(value ?? ''));
      });

      field.push(formGroup);
    });
  }

  private addFormValidations(): void {
    const { name, validators, nesting } = this.element;
    const validations = formValidationSet(validators);
    const formControl = this.form.get(`${name}`);

    if (validations) {
      formControl?.addValidators(validations);
      formControl?.updateValueAndValidity();
    }

    if (!nesting) return;

    const combinedDataArray = this.collapseNestingData(nesting);
    const nestedFieldControls = (<FormArray>formControl).controls;

    for (let index = 0; index < nestedFieldControls.length; index++) {
      const nestControls = nestedFieldControls[index];
      const nest = combinedDataArray[index].nesting;

      nest?.forEach((element: FormField) => {
        const { name: nestName, validators: nestValidators } = element;
        const nestValidations = formValidationSet(nestValidators);
        const nestControl = <FormControl>nestControls.get(`${nestName}`);

        nestControl?.addValidators(nestValidations);
        nestControl?.updateValueAndValidity();
      });
    }
  }

  private addFormCustomValidators(): void {
    const { name, relations, nesting } = this.element;

    relations?.forEach((relation) => {
      const { data, field, type } = relation;
      const formControl = this.form.get(`${field}`);
      const customValidator = formActions({ data, parentField: name, type });

      formControl?.addValidators(customValidator);
      formControl?.updateValueAndValidity();
    });

    nesting?.forEach((field: FormField) => {
      const { name: nestName, relations: nestRelations } = field;

      nestRelations?.forEach((relation) => {
        const { data: nestData, field: nestField, type: nestType } = relation;
        const nestFormControl = this.form.get(`${nestField}`);
        const nestCustomValidator = formActions({
          data: nestData,
          parentField: nestName,
          type: nestType
        });

        nestFormControl?.addValidators(nestCustomValidator);
        nestFormControl?.updateValueAndValidity();
      });
    });
  }

  private listenFormActions(): Observable<
    FormFieldAcceptableValue | undefined
  > {
    const { name, actions } = this.element;

    return (
      this.getFormValueChanges(name)?.pipe(
        tap((value: FormFieldAcceptableValue) => {
          actions?.forEach((action) => {
            const { data, field } = action;

            data.forEach((datum) => {
              const formField = this.form.get(`${field}`);
              const isExist = data.find((datum) => datum.value.includes(value));

              if (datum.role === 'disable') {
                isExist
                  ? formField?.disable({ emitEvent: true })
                  : formField?.enable({ emitEvent: true });
              }

              if (datum.role === 'enable') {
                isExist
                  ? formField?.enable({ emitEvent: true })
                  : formField?.disable({ emitEvent: true });
              }

              // ! TO DO: call the related service visibilityAction method for 'show' & 'hide'
            });
          });
        })
      ) ?? of(undefined)
    );
  }

  private listenFormAutoSetValues(): Observable<
    FormFieldAcceptableValue | undefined
  > {
    const { name, autoSet } = this.element;

    return (
      this.getFormValueChanges(name)?.pipe(
        tap((value: FormFieldAcceptableValue) => {
          autoSet?.forEach((auto) => {
            const { data, field, parentField, type } = auto;
            const parentFieldControl = <FormArray>(
              this.form.get(`${parentField}`)
            );

            const autoSetData: FormFieldAutoSetData | undefined = data.find(
              (datum) => {
                const dataValue = datum.value;

                switch (type) {
                  case 'greater':
                    return dataValue[0] < value;
                  case 'less':
                    return dataValue[0] > value;
                  case 'equal':
                    return dataValue[0] === value;
                  case 'include':
                  default:
                    return dataValue.includes(value);
                }
              }
            );

            if (!autoSetData) return;

            const { set, overwrite } = autoSetData;

            const setValue = overwrite
              ? set
              : this.form.get(`${field}`)?.value || set;

            if (setValue) {
              this.form.get(`${field}`)?.patchValue(setValue, {
                emitEvent: true
              });

              parentFieldControl?.controls.forEach((parentCtrl) => {
                parentCtrl.get(`${field}`)?.patchValue(setValue, {
                  emitEvent: true
                });
              });
            }
          });
        })
      ) ?? of(undefined)
    );
  }

  private listenFormControlRelations(): Observable<
    FormFieldAcceptableValue | undefined
  > {
    const { name, relations } = this.element;

    return (
      this.getFormValueChanges(name)?.pipe(
        tap(() => {
          relations?.forEach((relation) => {
            this.form.get(`${relation.field}`)?.updateValueAndValidity();
            this.form.get(`${relation.field}`)?.markAsTouched();
          });
        })
      ) ?? of(undefined)
    );
  }

  private collapseNestingData(data: FormField[]): FormField[] {
    const orderedNesting = DataReOrder<FormField>(data, 'order', 'ASC');

    return orderedNesting.reduce((result: FormField[], element) => {
      const existingElement = <FormField>(
        result.find((el: FormField) => el.order === element.order)
      );

      if (existingElement) {
        existingElement.nesting?.push(element);
      } else {
        result.push({
          ...element,
          nesting: [element],
          order: element.order
        });
      }

      return result;
    }, []);
  }

  private getFormValueChanges(
    name: string
  ): Observable<FormFieldAcceptableValue> | undefined {
    return this.form
      .get(`${name}`)
      ?.valueChanges.pipe(distinctUntilChanged(), debounceTime(10));
  }
}
