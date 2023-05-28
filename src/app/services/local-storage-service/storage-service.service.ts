import {Injectable} from '@angular/core';
import {AppComponent} from '../../app.component';


class LocalStorage implements Storage {
  [name: string]: any;

  length = 0;

  clear(): void {
  }

  getItem(key: string): string | null {
    return null;
  }

  key(index: number): string | null {
    return null;
  }

  removeItem(key: string): void {
  }

  setItem(key: string, value: string): void {
  }
}


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private storage: Storage;

  constructor() {
    this.storage = new LocalStorage();
    this.storage = localStorage;
  }

  [name: string]: any;

  length: number | undefined;

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }
}
