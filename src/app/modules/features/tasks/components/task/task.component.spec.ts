import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { getTasks } from '@app/tests/tasks-db';
import { DebugElement } from '@angular/core';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let element: DebugElement;
  let smartModal: any;

  beforeEach(async(() => {
    const smartModalSpy = jasmine.createSpyObj('NgxSmartModalService', ['getModal']);

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [TaskComponent],
      providers: [{ provide: NgxSmartModalService, useValue: smartModalSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TaskComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        smartModal = TestBed.inject<any>(NgxSmartModalService);
        component.task = getTasks(0);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy('component whas not created');
  });

  it('should display task', () => {
    const taskTitle = element.query(By.css('.task__title'));
    const taskDescription = element.query(By.css('.task__desc'));
    const taskDate = element.query(By.css('.task__date'));
    expect(taskTitle).toBeTruthy('no title displayed');
    expect(taskDescription).toBeTruthy('no description displayed');
    expect(taskDate).toBeTruthy('no date displayed');
  });

  it('should change styles when click on done button', () => {
    const doneButton = element.query(By.css('.button_action'));
    doneButton.nativeElement.click();
    fixture.detectChanges();
    const expectButton = element.query(By.css('.button_action-done'));
    const expectTitle = element.query(By.css('.task__title_done'));
    expect(expectButton).toBeTruthy('button class was not changed');
    expect(expectTitle).toBeTruthy('title class was not changed');
  });

  it('should open dropdown menu on click', () => {
    const menuButton = element.query(By.css('.button_menu'));
    menuButton.nativeElement.click();
    fixture.detectChanges();
    const expectDropdown = element.query(By.css('.dropdown'));
    expect(expectDropdown).toBeTruthy('dropdown are not opened');
  });

  it('should call smart modal to open when clicked on update button', () => {
    component.isMenuVisible = true;
    fixture.detectChanges();
    const updateButton = element.queryAll(By.css('.dropdown__item'))[0];
    updateButton.nativeElement.click();
    fixture.detectChanges();
    expect(smartModal.getModal).toHaveBeenCalledTimes(1);
  });

  it('should change styles when clicked on delete button', () => {
    component.isMenuVisible = true;
    fixture.detectChanges();
    const deleteButton = element.queryAll(By.css('.dropdown__item'))[1];
    deleteButton.nativeElement.click();
    fixture.detectChanges();
    const expectStyles = element.query(By.css('.task__title_deleted'));
    const expectMessage = element.query(By.css('.task__delete-message'));
    expect(expectStyles).toBeTruthy('styles of title are not changes');
    expect(expectMessage).toBeTruthy('message are not displayed');
  });
});
