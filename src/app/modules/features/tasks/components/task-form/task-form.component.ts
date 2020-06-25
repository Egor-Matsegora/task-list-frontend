import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { trigger, transition, useAnimation } from '@angular/animations';
// services
import { TasksService } from '@features/tasks/services/tasks/tasks.service';
import { ToastrService } from 'ngx-toastr';
// animations
import { enterAnimation, leaveAnimation } from '@app/animations/dynamic-control.animation';
// interfaces
import { Task } from '@interfaces/task.interface';
// smart modal
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';

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
  taskTytle: FormControl;
  modalData: Task;
  private modal: NgxSmartModalComponent;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private smartModal: NgxSmartModalService,
    private fb: FormBuilder,
    private tasksService: TasksService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initModal();
    this.inintForm();
    this.setFormVariables();
    this.setValidators();
    this.checkModalData();
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
      tytle: ['', Validators.required],
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
    this.taskTytle = this.form.get('tytle') as FormControl;
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
        this.modal.removeData();
      })
    );
  }

  /**
   * Проверка, есть ли приходящие в модалку данные
   * Если данные есть, значит это редактирование задачи
   * Устанавливаем значение инпутов на основе полученных данных
   * Если их нет, значит задача создается
   */
  private checkModalData(): void {
    this.subscriptions.add(
      this.modal.onOpen.subscribe(() => {
        this.modalData = this.modal.getData();
        if (!!this.modalData) {
          this.taskTytle.setValue(this.modalData.tytle);
          this.optionsChecks.controls.description.setValue(!!this.modalData.description);
          this.options.controls.description.setValue(this.modalData.description);
        }
      })
    );
  }

  /**
   * создание задачи
   */
  createTask(): void {
    if (this.form.valid) {
      this.form.disable();
      const task = {
        tytle: this.taskTytle.value,
        description: this.optionsChecks.controls.description ? this.options.controls.description.value : null,
      };
      this.subscriptions.add(
        this.tasksService.createTask(task).subscribe(
          (result) => {
            if (result._id) {
              this.tasksService.addTaskAction(result);
              this.modal.close();
              this.toastr.success(`Задача "${result.tytle}" успешно создана`);
            }
            this.form.enable();
          },
          (error) => {
            this.toastr.error('Ошибка в создании задачи');
            this.form.enable();
          }
        )
      );
    }
  }

  /**
   * обновление задачи
   */
  updateTask(): void {
    if (this.form.valid) {
      this.form.disable();
      this.modalData.tytle = this.taskTytle.value;
      this.modalData.description = this.optionsChecks.controls.description.value
        ? this.options.controls.description.value
        : null;
      this.subscriptions.add(
        this.tasksService.updateTask(this.modalData).subscribe(
          (task) => {
            this.form.enable();
            this.toastr.success(`Задача "${this.modalData.tytle}" успешно обновлена`);
            this.modal.close();
          },
          (error) => {
            this.form.enable();
            this.toastr.error('Ошибка в обновлении задачи');
          }
        )
      );
    }
  }

  closeModal() {
    this.modal.close();
  }
}
