import { Injectable } from '@angular/core';

@Injectable()
export class ServerLocalStorageService {
  private storage = {};

  constructor() {}

  getItem(key: string): string | null {
    return this.storage[key] ? this.storage[key] : null;
  }

  setItem(key: string, value: string): void {
    this.storage[key] = value;
  }

  removeItem(key: string): void {
    delete this.storage[key];
  }
}
