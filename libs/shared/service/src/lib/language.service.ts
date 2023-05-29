import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Language } from '@ng-dynamic-form/shared/models';

import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languages = Object.values(Language);

  constructor(
    private translateService: TranslateService,
    private tokenStorageService: TokenStorageService
  ) {}

  set(): void {
    const langParam = this.getLangFromUrl();
    const browserLang = this.getBrowserLang();

    if (langParam) {
      this.tokenStorageService.set('lang', langParam);
    }

    this.add();
    this.setDefaultLang();
    this.use(langParam ?? browserLang);
  }

  reset(): void {
    this.tokenStorageService.remove('lang');
  }

  private getLangFromUrl(): string | null {
    const url = new URL(window.location.href);
    return url.searchParams.get('lang');
  }

  private getBrowserLang(): string | undefined {
    return this.translateService.getBrowserLang();
  }

  // * this language will be used as a fallback when a translation isn't found in the current language
  private setDefaultLang(): void {
    this.translateService.setDefaultLang(Language.Default);
  }

  private add(): void {
    this.translateService.addLangs(this.languages);
  }

  private use(lang: string | undefined): void {
    this.translateService.use(
      lang?.match(this.languages.join('|')) ? lang : Language.Default
    );
  }
}
