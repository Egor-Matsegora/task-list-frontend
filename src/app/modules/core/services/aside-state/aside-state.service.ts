import { LocalStorageService } from './../local-storage/local-storage.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AsideStateService implements OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private asideState = new BehaviorSubject(this.asideStorageState);

  asideState$: Observable<boolean> = this.asideState.asObservable();

  constructor(private localStorage: LocalStorageService) {
    this.setDefaultState();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
    this.removeAsideStorageState();
  }

  get asideStorageState(): boolean {
    return !!Number(this.localStorage.getItem('asideState'));
  }

  setDefaultState(): void {
    this.subscriptions.add(
      this.asideState$
        .pipe(map((state) => (state ? '1' : '0')))
        .subscribe((state) => this.localStorage.setItem('asideState', state))
    );
  }

  setAsideState(): void {
    this.asideState.next(!this.asideStorageState);
  }

  removeAsideStorageState() {
    this.localStorage.getItem('asideState') && this.localStorage.removeItem('asideState');
  }
}
