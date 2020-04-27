import { User } from '@interfaces/user.interface';
import { UserService } from '@features/user/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
})
export class UserLayoutComponent implements OnInit {
  user: User;
  private subscriptions: Subscription = new Subscription();
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subOnUserInfo();
  }

  private subOnUserInfo() {
    this.subscriptions.add(this.userService.getUserInfo().subscribe((user) => (this.user = user)));
  }
}
