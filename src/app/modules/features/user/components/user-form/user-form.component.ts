import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserFormComponent implements OnInit {
  @Input() user: User;
  @Output() changeUser: EventEmitter<User> = new EventEmitter();
  @Output() changeUserPassword: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChangeUser(user: User) {
    this.changeUser.emit(user);
  }

  onChangeUserPassword(password: string) {
    this.changeUserPassword.emit(password);
  }
}
