import { Component, OnInit } from '@angular/core';
// services
import { TasksService } from '@features/tasks/services/tasks/tasks.service';
import { ToastrService } from 'ngx-toastr';
// interfaces
import { Task } from '@interfaces/task.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  items: Task[];

  constructor(private tasksService: TasksService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getTasks();
    this.subToUpdateTaskState();
  }

  private getTasks() {
    this.subscriptions.add(this.tasksService.getTasks().subscribe(response => (this.items = response)));
  }

  private subToUpdateTaskState() {
    this.subscriptions.add(this.tasksService.taskState$.subscribe(task => this.items.push(task)));
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
}
