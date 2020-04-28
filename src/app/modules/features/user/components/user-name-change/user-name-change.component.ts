import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '@interfaces/user.interface';
import { match } from '@app/validators/match.validator';

@Component({
  selector: 'user-name-change',
  templateUrl: './user-name-change.component.html',
})
export class UserNameChangeComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Output() changeUserName: EventEmitter<User> = new EventEmitter();
  @ViewChild('nameContainer', { read: ViewContainerRef, static: false }) nameContainer: ViewContainerRef;
  form: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  modified: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.initControlsVariables();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setValidators(changes.user);
  }

  private setValidators(currentChange: SimpleChange) {
    if (!currentChange.currentValue && !this.form) return;
    this.firstName.setValidators([match(this.user.firstName), Validators.required]);
    this.firstName.updateValueAndValidity();
    this.lastName.setValidators([match(this.user.firstName), Validators.required]);
    this.lastName.updateValueAndValidity();
  }

  private initForm() {
    this.form = this.fb.group({
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
    });
  }

  private initControlsVariables() {
    this.firstName = this.form.get('firstName') as FormControl;
    this.lastName = this.form.get('lastName') as FormControl;
  }

  private setFormControlsValues() {
    this.form.setValue({ firstName: this.user.firstName, lastName: this.user.lastName });
    this.firstName.updateValueAndValidity();
    this.lastName.updateValueAndValidity();
  }

  showControl(event: Event, template: TemplateRef<any>) {
    console.log(this.form);
    const button = event.target as HTMLButtonElement;
    if (button.innerText === 'изменить') {
      this.setFormControlsValues();
      button.innerText = 'отмена';
      this.modified = true;
      this.nameContainer.createEmbeddedView(template);
    } else {
      button.innerText = 'изменить';
      this.modified = false;
      this.nameContainer.clear();
      this.form.reset();
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    let newUser = { ...this.user, ...this.form.value };
    this.changeUserName.emit(newUser);
    newUser = null;
    this.form.reset();
    this.nameContainer.clear();
  }
}
