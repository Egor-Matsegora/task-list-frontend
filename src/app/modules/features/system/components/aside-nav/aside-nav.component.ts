import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
// services
import { AsideStateService } from '@core/services/aside-state/aside-state.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
// interfaces
import { User } from '@interfaces/user.interface';
// store
import { Store } from '@ngrx/store';
import { LoginActions } from '@features/auth/store/actions';
import { getAuthUser } from '@features/auth/store/state';

@Component({
  selector: 'aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss'],
})
export class AsideNavComponent implements OnInit {
  asideState: boolean;
  subscriptions: Subscription = new Subscription();
  user$: Observable<User>;

  constructor(
    private asideService: AsideStateService,
    private store: Store,
    private smartModal: NgxSmartModalService
  ) {}

  ngOnInit() {
    this.subToAsideState();
    this.subToUserInfo();
  }

  private subToAsideState() {
    this.subscriptions.add(
      this.asideService.asideState$.subscribe((state) => {
        this.asideState = state;
      })
    );
  }

  private subToUserInfo() {
    this.user$ = this.store.select(getAuthUser);
  }

  onExit() {
    const authModal = this.smartModal.getModal('authModal');
    if (authModal) {
      authModal.open();
    } else {
      this.store.dispatch(LoginActions.logoutAction());
    }
  }
}
