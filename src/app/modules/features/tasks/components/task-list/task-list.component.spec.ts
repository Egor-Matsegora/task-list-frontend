import { UiKitModule } from './../../../../shared/ui-kit/ui-kit.module';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from './../../services/tasks/tasks.service';
import { TaskComponent } from './../task/task.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { DebugElement } from '@angular/core';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let element: DebugElement;
  let tasksService: any;
  let toastr: any;

  beforeEach(async(() => {
    const tasksServiceSpy = jasmine.createSpyObj('TasksService', [
      'getTasks',
      'addTaskState$',
      'updateTaskState$',
      'deleteDoneTasksState$',
      'deleteTask',
      'UpdateTask'
    ]);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error', 'warning', 'success']);

    TestBed.configureTestingModule({
      imports: [UiKitModule],
      providers: [
        { provide: TasksService, useValue: tasksServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ],
      declarations: [TaskListComponent, TaskComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
        toastr = TestBed.get(ToastrService);
        tasksService = TestBed.get(TasksService);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
