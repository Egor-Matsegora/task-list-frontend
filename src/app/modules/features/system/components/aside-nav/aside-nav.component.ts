import { NgxSmartModalService } from 'ngx-smart-modal';
import { AsideStateService } from '@core/services/aside-state/aside-state.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
// services
import { UserService } from '@features/user/services/user.service';
// interfaces
import { User } from '@interfaces/user.interface';
import { LoginActions } from '@app/modules/features/auth/store/actions';
import { getAuthUser } from '@app/modules/features/auth/store/state/auth.state';

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
    private userService: UserService,
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
