import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import { match } from '@app/validators/match.validator';

@Component({
  selector: 'user-email-change',
  templateUrl: './user-email-change.component.html',
})
export class UserEmailChangeComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Output() changeUserEmail: EventEmitter<User> = new EventEmitter();
  @ViewChild('emailContainer', { read: ViewContainerRef, static: false }) emailContainer: ViewContainerRef;
  email: FormControl;
  modified: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setValidators(changes.user);
  }

  private initForm() {
    this.email = this.fb.control('');
  }

  private setValidators(currentChange: SimpleChange) {
    if (!currentChange.currentValue && !this.email) return;
    this.email.setValidators([Validators.required, Validators.email, match(this.user.email)]);
    this.email.updateValueAndValidity();
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
      this.email.reset();
    }
  }

  onSubmit() {
    if (this.email.invalid) return;
    let newUser = { ...this.user, email: this.email.value };
    this.changeUserEmail.emit(newUser);
    this.email.reset();
  }
}
