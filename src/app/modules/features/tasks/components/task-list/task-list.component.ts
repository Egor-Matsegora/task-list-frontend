import { Component, OnInit, OnDestroy } from '@angular/core';
import { transition, useAnimation, trigger } from '@angular/animations';
// services
import { TasksService } from '@features/tasks/services/tasks/tasks.service';
import { ToastrService } from 'ngx-toastr';
// interfaces
import { Task } from '@interfaces/task.interface';
import { Subscription } from 'rxjs';
// animations
import { removeAnimation, addAnimation } from '@app/animations/item.animation';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [trigger('itemAnimation', [transition(':leave', [useAnimation(removeAnimation)])])]
})
export class TaskListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  items: Task[] = [];
  isLoading: boolean = false;

  constructor(private tasksService: TasksService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getTasks();
    this.subToAddTaskState();
    this.subToUpdateTaskState();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }

  private getTasks() {
    this.isLoading = true;
    this.subscriptions.add(
      this.tasksService.getTasks().subscribe(
        response => {
          this.isLoading = false;
          this.items = response;
        },
        error => {
          this.isLoading = false;
          this.toastr.error('Ошибка в загрузке задач');
        }
      )
    );
  }

  private subToAddTaskState() {
    this.subscriptions.add(
      this.tasksService.addTaskState$.subscribe(task => {
        this.items.push(task);
      })
    );
  }

  private subToUpdateTaskState() {
    this.subscriptions.add(
      this.tasksService.updateTaskState$.subscribe(task => {
        this.items = this.items.map(item => {
          const result = task._id === item._id ? task : item;
          return result;
        });
      })
    );
  }

  onDone(value) {
    const task = this.items.find(item => item._id === value.id);
    task.done = value.done;
    this.tasksService.updateTask(task).subscribe(
      task => {
        this.items = this.items.map(item => {
          if (item._id === task._id) item.done = task.done;
          return item;
        });
        this.toastr.success(`Задача "${task.tytle}" обновлена`);
      },
      error => {
        this.toastr.error('Ошибка в обновлении заачи');
      }
    );
  }

  onDelete(id) {
    const task = this.items.find(item => item._id === id);
    const index = this.items.indexOf(task);
    this.tasksService.deleteTask(task).subscribe(
      response => {
        if (!response.success) return;
        this.items.splice(index, 1);
        this.toastr.warning(`Задача "${task.tytle}" удалена`);
      },
      error => this.toastr.error('Ошибка в удалении задачи')
    );
  }
}
