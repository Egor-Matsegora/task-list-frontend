import { Component, OnInit, Input } from '@angular/core';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  ngOnInit() {}
}
