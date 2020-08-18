import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetUserActions } from './modules/features/auth/store/actions';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(GetUserActions.getUserAction());
  }
}
