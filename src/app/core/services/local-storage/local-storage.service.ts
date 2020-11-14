import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  prefix = 'ngStorage-';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  retrieve(key: string): any {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    return JSON.parse(localStorage.getItem(this.prefix + key));
  }

  store(key: string, value: any) {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  clear(key?: string) {
    if (key) {
      localStorage.removeItem(this.prefix + key);
    } else {
      localStorage.clear();
    }
  }
}
