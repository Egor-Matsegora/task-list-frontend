import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDoneTasksState } from './../../store/state';
import { enableTasksAnimationsAction, deleteMultipleTasksAction } from '../../store/actions';
import { Task } from '@interfaces/task.interface';

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
    this.store.dispatch(enableTasksAnimationsAction());
    this.store.dispatch(deleteMultipleTasksAction({ tasks: this.doneTasks }));
  }
}
