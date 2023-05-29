import { Inject, Injectable } from '@angular/core';

import { STORAGE } from '@ng-dynamic-form/shared/token';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  constructor(@Inject(STORAGE) private storage: Storage) {}

  set(key: string, token: string): void {
    this.storage.setItem(key, token);
  }

  get(key: string): string | null {
    return this.storage.getItem(key) || null;
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
}
