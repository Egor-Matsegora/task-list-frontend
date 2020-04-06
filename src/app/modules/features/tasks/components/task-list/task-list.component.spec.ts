import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './../../../../shared/shared.module';
import { of } from 'rxjs';
import { UiKitModule } from './../../../../shared/ui-kit/ui-kit.module';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from './../../services/tasks/tasks.service';
import { TaskComponent } from './../task/task.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { DebugElement } from '@angular/core';
import { getTasks } from '@app/tests/tasks-db';
import { By } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';

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
      'updateTask'
    ]);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error', 'warning', 'success']);

    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
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
        element = fixture.debugElement;
        toastr = TestBed.get(ToastrService);
        tasksService = TestBed.get(TasksService);
        tasksService.addTaskState$ = of(null);
        tasksService.updateTaskState$ = of(null);
        tasksService.deleteDoneTasksState$ = of(null);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of tasks', () => {
    const tasks = getTasks();
    tasksService.getTasks.and.returnValue(of(tasks));
    fixture.detectChanges();
    const expectTasks = element.queryAll(By.css('.task-list__item'));
    const firstTaskTitle = element.queryAll(By.css('.task__title'))[0].nativeElement.innerText;
    expect(expectTasks).toBeTruthy('no tasks displayed');
    expect(expectTasks.length).toBe(10, 'unexpected length of tasks');
    expect(firstTaskTitle.toLowerCase()).toContain('добавить попапы везде где можно', 'unexpected title of first task');
  });

  it('should display loader when tasks loading from server', () => {
    tasksService.getTasks.and.returnValue(of([]).pipe(delay(500)));
    component.isLoading = true;
    fixture.detectChanges();
    const loader = element.queryAll(By.css('loader'));
    expect(loader.length).toBe(1, 'unexpected number of loaders');
  });

  it('should display message when tasks array is epty', () => {
    tasksService.getTasks.and.returnValue(of([]));
    fixture.detectChanges();
    const message = element.query(By.css('.task-list__message'));
    expect(message).toBeTruthy('no message displayed');
  });
});
