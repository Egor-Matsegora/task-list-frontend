import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImageChangeComponent } from './user-image-change.component';

xdescribe('UserImageChangeComponent', () => {
  let component: UserImageChangeComponent;
  let fixture: ComponentFixture<UserImageChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserImageChangeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserImageChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
