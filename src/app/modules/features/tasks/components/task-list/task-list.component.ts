import { Component, OnInit, OnDestroy } from '@angular/core';
import { transition, useAnimation, trigger } from '@angular/animations';
import { switchMap, mergeMap, filter } from 'rxjs/operators';
import { Subscription, from, Observable } from 'rxjs';
// services
import { TasksService } from '@features/tasks/services/tasks/tasks.service';
import { ToastrService } from 'ngx-toastr';
// interfaces
import { Task } from '@interfaces/task.interface';
// animations
import { removeAnimation, addAnimation } from '@app/animations/item.animation';
import { Store } from '@ngrx/store';
import { TasksState, TasksActions } from './../../store';
import { TasksApiActions } from '../../store/actions';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [trigger('itemAnimation', [transition(':leave', [useAnimation(removeAnimation)])])],
})
export class TaskListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  items$: Observable<Task[]>;
  isLoading: boolean;
  isEmptyContent: boolean;

  constructor(private tasksService: TasksService, private toastr: ToastrService, private store: Store) {}

  ngOnInit() {
    this.getTasks();
    this.subToPageLoadingState();
    this.subToEmptyTasksState();
    this.subToTaskErrorState();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }

  private getTasks() {
    this.store.dispatch(TasksActions.TasksApiActions.loadTasks());
    this.items$ = this.store.select(TasksState.getTasks);
  }

  private subToPageLoadingState() {
    const storeLoadingSub = this.store
      .select(TasksState.getPageLoading)
      .subscribe((status) => (this.isLoading = status));
    this.subscriptions.add(storeLoadingSub);
  }

  private subToEmptyTasksState() {
    const storeEmptySub = this.store
      .select(TasksState.getEmptyTasksState)
      .subscribe((status) => (this.isEmptyContent = status));
    this.subscriptions.add(storeEmptySub);
  }

  private subToTaskErrorState() {
    const storeErrorSub = this.store
      .select(TasksState.getError)
      .pipe(
        filter((error) => error !== null),
        mergeMap((error) => this.toastr.error(error).onHidden)
      )
      .subscribe(() => this.store.dispatch(TasksActions.TasksActions.clearTasksMessages()));
    this.subscriptions.add(storeErrorSub);
  }

  onDone(task: Task) {
    this.store.dispatch(TasksActions.TasksApiActions.doneTask({ task }));
  }

  onDelete(task: Task) {
    this.store.dispatch(TasksActions.TasksApiActions.deleteTask({ task }));
  }

  onUpdate(task: Task) {
    this.store.dispatch(TasksActions.TasksActions.selectTask({ task }));
  }
}
