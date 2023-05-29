import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { ProfileFormService } from '@ng-dynamic-form/dogstagram/service';
import type { FormTile, FormValueData } from '@ng-dynamic-form/shared/models';

@Component({
  selector: 'scope-dogstagram-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  valueData$!: Observable<FormValueData[]>;
  formData$!: Observable<FormTile[]>;
  profileForm: FormGroup = new FormGroup({});

  constructor(private tciTestFormService: ProfileFormService) {}

  ngOnInit(): void {
    this.assignObservables();
    this.callServices();
  }

  private assignObservables(): void {
    this.valueData$ = this.tciTestFormService.valueData$;
    this.formData$ = this.tciTestFormService.formData$;
  }

  private callServices(): void {
    this.tciTestFormService.getValueData();
    this.tciTestFormService.getFormData();
  }
}
