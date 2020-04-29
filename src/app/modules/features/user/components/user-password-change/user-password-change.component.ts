import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  Output,
  EventEmitter,
  TemplateRef,
  SimpleChange,
} from '@angular/core';
import { ExistingPasswordValidator } from '@validators/existing-password.validator';
import { match } from '@validators/match.validator';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.scss'],
  providers: [ExistingPasswordValidator],
})
export class UserPasswordChangeComponent implements OnInit {
  @Input() user: User;
  @Output() changeUserPassword: EventEmitter<string> = new EventEmitter();
  @ViewChild('passwordContainer', { read: ViewContainerRef, static: false }) passwordContainer: ViewContainerRef;
  form: FormGroup;
  oldPassword: FormControl;
  newPassword: FormControl;
  modified: boolean;
  constructor(private fb: FormBuilder, private existingPasswordValidator: ExistingPasswordValidator) {}

  ngOnInit() {
    this.initForm();
    this.setControlsVariables();
    this.setValidators();
  }

  private initForm() {
    this.form = this.fb.group({
      oldPassword: this.fb.control(
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
        this.existingPasswordValidator.validate.bind(this.existingPasswordValidator)
      ),
      newPassword: this.fb.control(''),
    });
  }

  private setValidators() {
    this.newPassword.setValidators([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      match(this.form.value.oldPassword),
    ]);
    this.newPassword.updateValueAndValidity();
  }

  private setControlsVariables() {
    this.oldPassword = this.form.get('oldPassword') as FormControl;
    this.newPassword = this.form.get('newPassword') as FormControl;
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
