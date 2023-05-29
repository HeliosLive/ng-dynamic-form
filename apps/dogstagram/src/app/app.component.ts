import { Component, OnInit } from '@angular/core';

import { NdfThemeService } from '@ng-dynamic-form/shared/service';

@Component({
  selector: 'scope-dogstagram-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private ndfThemeService: NdfThemeService) {}

  ngOnInit(): void {
    this.listenTheme();
  }

  private listenTheme(): void {
    this.ndfThemeService.initialize();
    this.ndfThemeService.listen();
  }
}
