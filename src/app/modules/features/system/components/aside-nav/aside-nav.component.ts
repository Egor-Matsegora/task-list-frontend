import { AsideStateService } from '@core/services/aside-state/aside-state.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// services
import { AuthService } from '@core/services/auth/auth.service';
import { UserService } from '@features/user/services/user.service';
// interfaces
import { User } from '@interfaces/user.interface';

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
    private authService: AuthService,
    private userService: UserService
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
    this.authService.logout();
  }
}
