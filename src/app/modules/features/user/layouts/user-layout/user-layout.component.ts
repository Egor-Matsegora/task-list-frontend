import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserService } from '@features/user/services/user.service';
import { User } from '@interfaces/user.interface';
import { LoginActions } from '@features/auth/store/actions';
import { getAuthUser } from '@app/modules/features/auth/store/state/auth.state';

@Component({
  selector: 'user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
})
export class UserLayoutComponent implements OnInit {
  user$: Observable<User>;
  private subscriptions: Subscription = new Subscription();
  constructor(private userService: UserService, private toastr: ToastrService, private store: Store) {}

  ngOnInit() {
    this.subOnUserInfo();
  }

  private subOnUserInfo() {
    this.user$ = this.store.select(getAuthUser);
  }

  onChangeUser(user: User) {
    this.subscriptions.add(
      this.userService.updateUser(user).subscribe(
        (user) => {
          this.userService.dispatchUserUpdateState(user);
          this.toastr.success('Данные успешно обновлены');
        },
        (error) => this.toastr.error('Ошибка обновления данных')
      )
    );
  }

  onChangeUserPassword(password: string) {
    this.subscriptions.add(
      this.userService.updatePassword(password).subscribe(
        (user) => {
          if (!user) return;
          this.toastr.success('Данные успешно обновлены, войдите под новым паролем');
          this.store.dispatch(LoginActions.logoutAction());
        },
        (error) => this.toastr.error('Ошибка обновления данных')
      )
    );
  }

  onChangeUserImage(image: File) {
    this.subscriptions.add(
      this.userService.updateImage(image).subscribe((user) => {
        if (!user) return;
        this.userService.dispatchUserUpdateState(user);
        this.toastr.success('Данные успешно обновлены');
      })
    );
  }
}
