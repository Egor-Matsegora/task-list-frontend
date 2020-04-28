import { Component, OnInit, Input, ViewChild, ViewContainerRef, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserFormComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  ngOnInit() {}

  onChangeUser(user: User) {
    console.log(user);
  }

  onChangeUserPassword(password: string) {
    console.log(password);
  }
}
