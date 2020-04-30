import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@core/services/auth/auth.service';
import { UserService } from '@features/user/services/user.service';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
})
export class UserLayoutComponent implements OnInit {
  user: User;
  private subscriptions: Subscription = new Subscription();
  constructor(private userService: UserService, private toastr: ToastrService, private authService: AuthService) {}

  ngOnInit() {
    this.subOnUserInfo();
  }

  private subOnUserInfo() {
    this.subscriptions.add(this.userService.getUserInfo().subscribe((user) => (this.user = user)));
  }

  onChangeUser(user: User) {
    this.subscriptions.add(
      this.userService.updateUser(user).subscribe(
        (user) => {
          this.user = {
            ...this.user,
            ...user,
          };
          this.userService.dispatchUserUpdateState(this.user);
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
          this.authService.logout();
        },
        (error) => this.toastr.error('Ошибка обновления данных')
      )
    );
  }

  onChangeUserImage(image: File) {
    this.subscriptions.add(
      this.userService.updateImage(image).subscribe((user) => {
        if (!user) return;
        this.user = {
          ...this.user,
          ...user,
        };
        this.userService.dispatchUserUpdateState(this.user);
        this.toastr.success('Данные успешно обновлены');
      })
    );
  }
}
