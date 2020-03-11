import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AsideStateService {
  private asideState = new BehaviorSubject(false);

  asideState$ = this.asideState.asObservable();

  setAsideState(state) {
    this.asideState.next(state);
  }

  constructor() {}
}
