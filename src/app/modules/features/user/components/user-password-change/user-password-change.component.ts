import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.scss'],
})
export class UserPasswordChangeComponent implements OnInit {
  @Input() user: User;
  @Output() changeUserPassword: EventEmitter<string> = new EventEmitter();
  @ViewChild('passwordContainer', { read: ViewContainerRef, static: false }) passwordContainer: ViewContainerRef;
  form: FormGroup;
  modified: boolean;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      oldPassword: this.fb.control('', Validators.required),
      newPassword: this.fb.control('', Validators.required),
    });
  }

  showControl(event: Event, template: TemplateRef<any>) {
    const button = event.target as HTMLButtonElement;
    if (button.innerText === 'изменить') {
      button.innerText = 'отмена';
      this.modified = true;
      this.passwordContainer.createEmbeddedView(template);
    } else {
      button.innerText = 'изменить';
      this.modified = false;
      this.passwordContainer.clear();
      this.form.reset();
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.changeUserPassword.emit(this.form.value.newPassword);
    this.form.reset();
  }
}
