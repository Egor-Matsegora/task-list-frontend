import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { trigger, transition, useAnimation } from '@angular/animations';
// animations
import { enterAnimation, leaveAnimation } from '@app/animations/dynamic-control.animation';
// interfaces
import { Task } from '@interfaces/task.interface';
// smart modal
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';
import { Store } from '@ngrx/store';
import { getSelectedTask, getTaskLoading } from '../../store/state';
import { createTaskAction, updateTaskAction, unselectTaskAction } from '../../store/actions';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  animations: [
    trigger('controlAnimation', [
      transition(':enter', [useAnimation(enterAnimation)]),
      transition(':leave', [useAnimation(leaveAnimation)]),
    ]),
  ],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  options: FormGroup;
  optionsChecks: FormGroup;
  taskTitle: FormControl;
  taskForUpdate: Task;
  isLoading: boolean;
  private modal: NgxSmartModalComponent;
  private subscriptions: Subscription = new Subscription();

  constructor(private smartModal: NgxSmartModalService, private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.initModal();
    this.inintForm();
    this.setFormVariables();
    this.setValidators();
    this.checkSelectedTaskState();
    this.subToTaskLoadingState();
    this.subToCloseEvent();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }

  /**
   * Инициализация формы
   */
  private inintForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      optionsChecks: this.fb.group({
        description: false,
      }),
      options: this.fb.group({
        description: '',
      }),
    });
  }

  /**
   * Инициализация переменных для отображения в шаблоне
   */
  private setFormVariables(): void {
    this.options = this.form.get('options') as FormGroup;
    this.optionsChecks = this.form.get('optionsChecks') as FormGroup;
    this.taskTitle = this.form.get('title') as FormControl;
  }

  /**
   * Установка и удаление валидаторов при динамическом добавлении инпутов
   */
  private setValidators(): void {
    this.optionsChecks.valueChanges.subscribe((value) => {
      for (const key in value) {
        if (key) {
          const control = this.options.controls[key];
          if (value[key]) {
            control.setValidators(Validators.required);
            control.updateValueAndValidity();
          } else {
            control.clearValidators();
            control.updateValueAndValidity();
            control.reset();
          }
        }
      }
    });
  }

  /**
   * Инициализация модалки
   */
  private initModal(): void {
    this.modal = this.smartModal.getModal('taskModal');
  }

  /**
   * Очистка формы при закрытии модалки
   */
  private subToCloseEvent(): void {
    this.subscriptions.add(
      this.modal.onAnyCloseEvent.subscribe(() => {
        this.form.reset();
        this.taskForUpdate && this.store.dispatch(unselectTaskAction());
      })
    );
  }

  /**
   * Проверка, есть ли selected user
   */
  private checkSelectedTaskState(): void {
    const selectedTaskStateSub = this.store
      .select(getSelectedTask)
      .pipe()
      .subscribe((task) => {
        this.taskForUpdate = task;
        if (task) {
          this.modal.open();
          this.taskTitle.setValue(task.title);
          this.optionsChecks.controls.description.setValue(!!task.description);
          this.options.controls.description.setValue(task.description);
        }
      });
    this.subscriptions.add(selectedTaskStateSub);
  }

  private subToTaskLoadingState() {
    this.store.select(getTaskLoading).subscribe((state) => {
      this.isLoading = state;
      if (!state) {
        this.form.enable();
        this.modal.close();
      }
    });
  }

  /**
   * создание задачи
   */
  createTask(): void {
    if (this.form.valid && !this.taskForUpdate) {
      this.form.disable();
      const task = {
        title: this.taskTitle.value,
        description: this.optionsChecks.controls.description ? this.options.controls.description.value : null,
      };
      this.store.dispatch(createTaskAction(task));
    }
  }

  /**
   * обновление задачи
   */
  updateTask(): void {
    if (this.form.valid && this.taskForUpdate) {
      const result: Task = {
        ...this.taskForUpdate,
        title: this.taskTitle.value,
        description: this.optionsChecks.controls.description.value ? this.options.controls.description.value : null,
      };
      this.form.disable();
      this.store.dispatch(updateTaskAction({ task: result }));
    }
  }

  closeModal() {
    this.modal.close();
  }
}
