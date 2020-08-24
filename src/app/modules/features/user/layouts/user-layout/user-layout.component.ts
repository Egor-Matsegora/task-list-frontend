import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserService } from '@features/user/services/user.service';
import { User } from '@interfaces/user.interface';
import { LoginActions, ChangeUserActions } from '@features/auth/store/actions';
import { getAuthUser } from '@app/modules/features/auth/store/state/auth.state';

@Component({
  selector: 'user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
})
export class UserLayoutComponent implements OnInit {
  user$: Observable<User>;
  private subscriptions: Subscription = new Subscription();
  constructor(private toastr: ToastrService, private store: Store) {}

  ngOnInit() {
    this.subOnUserInfo();
  }

  private subOnUserInfo() {
    this.user$ = this.store.select(getAuthUser);
  }

  onChangeUser(user: User) {
    this.store.dispatch(ChangeUserActions.changeUserAction({ user }));
  }

  onChangeUserPassword(password: string) {
    this.store.dispatch(ChangeUserActions.changeUserPasswordAction({ password }));
  }

  onChangeUserImage(image: File) {
    this.store.dispatch(ChangeUserActions.changeUserImageAction({ image }));
  }
}
