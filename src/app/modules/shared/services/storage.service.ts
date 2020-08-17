import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  set(key: string, data: any): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`error while setting ${key} to localStorage`, error);
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (error) {
      console.error(`error while getting ${key} from localStorage`, error);
      return null;
    }
  }

  delete(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`error while deleting ${key} from localStorage`, error);
    }
  }
}
