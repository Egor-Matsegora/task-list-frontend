import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@interfaces/user.interface';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef,
  ViewChild,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'user-email-change',
  templateUrl: './user-email-change.component.html',
})
export class UserEmailChangeComponent implements OnInit {
  @Input() user: User;
  @Output() changeUserEmail: EventEmitter<User> = new EventEmitter();
  @ViewChild('emailContainer', { read: ViewContainerRef, static: false }) emailContainer: ViewContainerRef;
  form: FormGroup;
  modified: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      newEmail: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  showControl(event: Event, template: TemplateRef<any>) {
    const button = event.target as HTMLButtonElement;
    if (button.innerText === 'изменить') {
      button.innerText = 'отмена';
      this.modified = true;
      this.emailContainer.createEmbeddedView(template);
    } else {
      button.innerText = 'изменить';
      this.modified = false;
      this.emailContainer.clear();
      this.form.reset();
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    let newUser = { ...this.user, email: this.form.value.newEmail };
    this.changeUserEmail.emit(newUser);
    this.form.reset();
  }
}
