import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerLayoutComponent } from './scheduler-layout.component';

describe('SchedulerLayoutComponent', () => {
  let component: SchedulerLayoutComponent;
  let fixture: ComponentFixture<SchedulerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
