import { TasksService } from './../../services/tasks/tasks.service';
import { enterAnimation, liveAnimation } from './animations/dynamic-control.animation';
import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { trigger, transition, useAnimation } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  animations: [
    trigger('controlAnimation', [
      transition(':enter', [useAnimation(enterAnimation)]),
      transition(':leave', [useAnimation(liveAnimation)])
    ])
  ]
})
export class TaskFormComponent implements OnInit {
  form: FormGroup;
  options: FormGroup;
  optionsChecks: FormGroup;
  taskTytle: FormControl;

  constructor(
    private smartModal: NgxSmartModalService,
    private fb: FormBuilder,
    private tasksService: TasksService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.inintForm();
    this.setFormVariables();
    this.setValidators();
  }

  private inintForm() {
    this.form = this.fb.group({
      tytle: ['', Validators.required],
      optionsChecks: this.fb.group({
        description: false
      }),
      options: this.fb.group({
        description: ''
      })
    });
  }

  private setFormVariables() {
    this.options = this.form.get('options') as FormGroup;
    this.optionsChecks = this.form.get('optionsChecks') as FormGroup;
    this.taskTytle = this.form.get('tytle') as FormControl;
  }

  private setValidators() {
    this.optionsChecks.valueChanges.subscribe(value => {
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

  closeTaskModal() {
    const taskModal = this.smartModal.getModal('taskModal');
    taskModal && taskModal.close();
    this.form.reset();
  }

  createTask() {
    if (this.form.valid) {
      this.form.disable();
      const task = {
        tytle: this.taskTytle.value,
        description: this.options.controls.description.value
      };
      this.tasksService.createTask(task).subscribe(
        result => {
          if (result.tytle) {
            this.tasksService.updateTaskState(result);
            this.closeTaskModal();
            this.toastr.success(`Задача "${result.tytle}" успешно создана`);
          }
          this.form.enable();
        },
        error => {
          this.toastr.error('Ошибка в создании задачи');
          this.form.enable();
        }
      );
    }
  }
}
