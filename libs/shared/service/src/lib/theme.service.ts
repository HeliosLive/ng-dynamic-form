import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import type { Theme } from '@ng-dynamic-form/shared/models';

@Injectable({
  providedIn: 'root'
})
export class NdfThemeService {
  private readonly data = new BehaviorSubject<Theme>('light');
  public data$ = this.data.asObservable();

  initialize(): void {
    const isMatch = this.matchMedia().matches;
    this.set(isMatch);
  }

  /* istanbul ignore next */
  listen(): void {
    this.matchMedia().addEventListener('change', ({ matches: isDark }) => {
      this.set(isDark);
    });
  }

  private matchMedia(): MediaQueryList {
    return window.matchMedia('(prefers-color-scheme: dark)');
  }

  private set(isMatch: boolean): void {
    const theme = isMatch ? 'dark' : 'light';
    this.data.next(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
