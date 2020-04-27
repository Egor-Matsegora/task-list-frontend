import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() user: User;
  modified: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  showControl(event: Event) {
    const button = event.target as HTMLButtonElement;
    button.innerText = button.innerText === 'изменить' ? 'отмена' : 'изменить';
    this.modified = button.innerText === 'изменить' ? false : true;
  }
}
