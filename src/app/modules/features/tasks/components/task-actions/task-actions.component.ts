import { Task } from '@interfaces/task.interface';
import { getDoneTasksState } from './../../store/state/index';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TasksApiActions, TasksActions } from '../../store/actions';

@Component({
  selector: 'task-actions',
  templateUrl: './task-actions.component.html',
  styleUrls: ['./task-actions.component.scss'],
})
export class TaskActionsComponent implements OnInit {
  doneTasks: Task[];

  constructor(private store: Store) {}

  ngOnInit() {
    this.getDoneTasks();
  }

  private getDoneTasks() {
    this.store.select(getDoneTasksState).subscribe((tasks) => (this.doneTasks = tasks));
  }

  deleteCompleted() {
    if (!this.doneTasks.length) return;
    this.store.dispatch(TasksActions.enableTasksAnimations());
    this.store.dispatch(TasksApiActions.deleteMultipleTasks({ tasks: this.doneTasks }));
  }
}
