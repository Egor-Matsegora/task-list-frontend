import { TasksService } from './../../services/tasks/tasks.service';
import { Task } from '@interfaces/task.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  items: Task[];

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.getTasks();
  }

  private getTasks() {
    this.tasksService.getTasks().subscribe(response => (this.items = response));
  }
}
