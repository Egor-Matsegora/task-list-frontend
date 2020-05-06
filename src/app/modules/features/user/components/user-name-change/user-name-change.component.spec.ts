import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNameChangeComponent } from './user-name-change.component';

xdescribe('UserNameChangeComponent', () => {
  let component: UserNameChangeComponent;
  let fixture: ComponentFixture<UserNameChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserNameChangeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNameChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
