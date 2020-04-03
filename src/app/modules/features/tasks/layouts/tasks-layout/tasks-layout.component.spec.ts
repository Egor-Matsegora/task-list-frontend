import { SharedModule } from '@shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksLayoutComponent } from './tasks-layout.component';
import { TasksModule } from '../../tasks.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TasksLayoutComponent', () => {
  let component: TasksLayoutComponent;
  let fixture: ComponentFixture<TasksLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TasksModule, SharedModule, HttpClientTestingModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TasksLayoutComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
