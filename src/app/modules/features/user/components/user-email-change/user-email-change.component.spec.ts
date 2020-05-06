import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmailChangeComponent } from './user-email-change.component';

xdescribe('UserEmailChangeComponent', () => {
  let component: UserEmailChangeComponent;
  let fixture: ComponentFixture<UserEmailChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserEmailChangeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEmailChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
