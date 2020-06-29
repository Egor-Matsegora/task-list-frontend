import { Injectable } from '@angular/core';

@Injectable()
export class ServerLocalStorageService {
  private storage = {};

  constructor() {}

  getItem(key: string): string | null {
    console.log(this.storage);
    return this.storage[key] ? this.storage[key] : null;
  }

  setItem(key: string, value: string): void {
    console.log(this.storage);
    this.storage[key] = value;
  }

  removeItem(key: string): void {
    console.log(this.storage);
    delete this.storage[key];
  }
}
