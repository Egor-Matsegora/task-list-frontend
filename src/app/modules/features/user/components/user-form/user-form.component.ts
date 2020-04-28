import { Component, OnInit, Input, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() user: User;
  @ViewChild('nameContainer', { read: ViewContainerRef, static: false }) nameContainer: ViewContainerRef;
  @ViewChild('emailContainer', { read: ViewContainerRef, static: false }) emailContainer: ViewContainerRef;
  @ViewChild('passwordContainer', { read: ViewContainerRef, static: false }) passwordContainer: ViewContainerRef;
  @ViewChild('btnTemplate', { read: TemplateRef, static: false }) btnTemplate: TemplateRef<any>;
  modified: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      oldEmail: this.fb.control(''),
      newEmail: this.fb.control(''),
      oldPassword: this.fb.control(''),
      newPassword: this.fb.control(''),
    });
  }

  private setFormControlsValues() {
    this.form.get('firstName').patchValue(this.user.firstName);
    this.form.get('firstName').updateValueAndValidity();
    this.form.get('lastName').setValue(this.user.lastName);
    this.form.get('oldEmail').setValue(this.user.email);
  }

  private setContainer(type: string) {
    switch (type) {
      case 'name':
        return this.nameContainer;
      case 'email':
        return this.emailContainer;
      case 'password':
        return this.passwordContainer;
    }
  }

  showControl(event: Event, type: string, template: TemplateRef<any>) {
    this.setFormControlsValues();
    const button = event.target as HTMLButtonElement;
    const container = this.setContainer(type);
    if (button.innerText === 'изменить') {
      button.innerText = 'отмена';
      this.modified = true;
      container.createEmbeddedView(template);
      container.createEmbeddedView(this.btnTemplate);
    } else {
      button.innerText = 'изменить';
      this.modified = false;
      container.clear();
    }
  }
}
