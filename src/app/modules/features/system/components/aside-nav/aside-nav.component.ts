import { NgxSmartModalService } from 'ngx-smart-modal';
import { AsideStateService } from '@core/services/aside-state/aside-state.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
// services
import { UserService } from '@features/user/services/user.service';
// interfaces
import { User } from '@interfaces/user.interface';
import { LoginActions } from '@app/modules/features/auth/store/actions';

@Component({
  selector: 'aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss'],
})
export class AsideNavComponent implements OnInit {
  asideState: boolean;
  subscriptions: Subscription = new Subscription();
  user: User;

  constructor(
    private asideService: AsideStateService,
    private store: Store,
    private userService: UserService,
    private smartModal: NgxSmartModalService
  ) {}

  ngOnInit() {
    this.subToAsideState();
    this.subToUserInfo();
    this.subToUserUpdateState();
  }

  private subToAsideState() {
    this.subscriptions.add(
      this.asideService.asideState$.subscribe((state) => {
        this.asideState = state;
      })
    );
  }

  private subToUserInfo() {
    this.subscriptions.add(this.userService.getUserInfo().subscribe((user) => (this.user = user)));
  }

  private subToUserUpdateState() {
    this.userService.userUpdateState$.subscribe((user) => (this.user = { ...this.user, ...user }));
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
