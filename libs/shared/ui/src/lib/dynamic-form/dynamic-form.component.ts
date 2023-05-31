import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, Subject, takeUntil, tap } from 'rxjs';

import {
  FormField,
  FormTile,
  FormValueData
} from '@ng-dynamic-form/shared/models';
import { NdfDynamicFormBuilderService } from '@ng-dynamic-form/shared/service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ndf-ui-dynamic-form',
  styleUrls: ['./dynamic-form.component.scss'],
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) prefix!: string;
  @Input({ required: true }) valueData$!: Observable<FormValueData[]>;
  @Input({ required: true }) formData$!: Observable<FormTile[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private ndfDynamicFormBuilderService: NdfDynamicFormBuilderService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildForm(): void {
    this.formData$
      .pipe(
        takeUntil(this.destroy$),
        tap((tiles: FormTile[]) => {
          tiles.forEach((tile) => {
            this.updateDynamicFormControls(tile.fields);
          });
        })
      )
      .subscribe();
  }

  private updateDynamicFormControls(data: FormField[]): void {
    data.forEach((element) => {
      this.ndfDynamicFormBuilderService
        .buildForm(this.form, element)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    });
  }
}
