import { HttpErrorResponse } from '@angular/common/http';

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TasksService } from './tasks.service';

import { Task } from '@interfaces/task.interface';
import { TASKS } from '@tests/tasks-db';

let tasksService: TasksService;
let httpTestingController: HttpTestingController;

xdescribe('TasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService],
    });

    tasksService = TestBed.get(TasksService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  // constructor
  it('should be created', () => {
    expect(tasksService).toBeTruthy();
    expect(httpTestingController).toBeTruthy();
  });

  // getTasks()
  it('should get all the tasks', () => {
    tasksService.getTasks().subscribe((tasks: Task[]) => {
      expect(tasks).toBeTruthy('no tasks returned');
      expect(tasks.length).toBe(10);
      const task: Task = tasks.find((task) => task._id === '5e7484ac8bb00c23073935ee');
      expect(task.tytle).toEqual('добавить попапы везде где можно');
    });

    const request = httpTestingController.expectOne('http://localhost:5000/api/tasks/');
    expect(request.request.method).toEqual('GET');
    request.flush(TASKS);
  });

  // updateTask()
  it('should update task', () => {
    const changeTask = {
      description: 'test description',
      _id: '5e7484ac8bb00c23073935ee',
      tytle: 'test title',
    };

    tasksService.updateTask(changeTask).subscribe((task) => {
      expect(task).toBeTruthy('no task returned');
      expect(task.tytle).toEqual('test title', 'task title not modified');
      expect(task.description).toEqual('test description', 'task description not modified');
    });

    const request = httpTestingController.expectOne('http://localhost:5000/api/tasks/5e7484ac8bb00c23073935ee');
    expect(request.request.method).toEqual('PATCH');
    request.flush({ ...TASKS[0], ...changeTask });
  });

  // createTask()
  it('should create new task', () => {
    const taskData = {
      tytle: 'some tytle',
      description: null,
    };

    tasksService.createTask(taskData).subscribe((task) => {
      expect(task).toBeTruthy();
      expect(task.tytle).toEqual(taskData.tytle);
    });

    const request = httpTestingController.expectOne('http://localhost:5000/api/tasks/');
    expect(request.request.method).toEqual('POST');
    request.flush(taskData);
  });

  // deleteTask()
  it('should delete task', () => {
    const deleteTask = {
      _id: '5e7484ac8bb00c23073935ee',
    };

    tasksService.deleteTask(deleteTask).subscribe((response) => {
      expect(response).toBeTruthy('no response returned');
      expect(response.success).toBeTruthy('no success property in response');
    });

    const request = httpTestingController.expectOne('http://localhost:5000/api/tasks/5e7484ac8bb00c23073935ee');
    expect(request.request.method).toEqual('DELETE');
    request.flush({ success: true });
  });

  // error handling
  it('should returns error when request is failed', () => {
    spyOn(console, 'error');

    tasksService.getTasks().subscribe(
      () => fail('request shold be failed'),
      (error: HttpErrorResponse) => {
        expect(console.error).toHaveBeenCalled();
        expect(error.status).toBe(500);
      }
    );

    const request = httpTestingController.expectOne('http://localhost:5000/api/tasks/');
    expect(request.request.method).toEqual('GET');
    request.flush('get all tasks failed', { status: 500, statusText: 'Internal Server Error' });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
