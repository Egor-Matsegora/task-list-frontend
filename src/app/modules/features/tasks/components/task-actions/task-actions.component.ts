import { TasksService } from './../../services/tasks/tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-actions',
  templateUrl: './task-actions.component.html',
  styleUrls: ['./task-actions.component.scss']
})
export class TaskActionsComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  ngOnInit() {}

  deleteCompleted() {
    this.tasksService.deleteDoneTasksAction();
  }
}
