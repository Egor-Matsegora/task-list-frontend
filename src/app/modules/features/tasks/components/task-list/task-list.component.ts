import { Component, OnInit, OnDestroy } from '@angular/core';
import { transition, useAnimation, trigger } from '@angular/animations';
import { mergeMap, filter } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
// services
import { ToastrService } from 'ngx-toastr';
// interfaces
import { Task } from '@interfaces/task.interface';
// animations
import { removeAnimation, addAnimation } from '@app/animations/item.animation';
import { Store } from '@ngrx/store';
import * as TasksActions from '../../store/actions';
import * as TasksState from '../../store/state';

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
  disableAnimation: boolean;

  constructor(private toastr: ToastrService, private store: Store) {}

  ngOnInit() {
    this.getTasks();
    this.subToPageLoadingState();
    this.subToEmptyTasksState();
    this.subToTaskErrorState();
    this.subToMessagesState();
    this.subToAnimationState();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }

  private getTasks() {
    this.store.dispatch(TasksActions.loadTasksAction());
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
      .subscribe(() => this.store.dispatch(TasksActions.clearTasksMessagesAction()));
    this.subscriptions.add(storeErrorSub);
  }

  private subToMessagesState() {
    const successMsgStateSub = this.store
      .select(TasksState.getTasksSuccessMessage)
      .pipe(
        filter((message) => message !== null),
        mergeMap((message) => this.toastr.success(message).onHidden)
      )
      .subscribe(() => this.store.dispatch(TasksActions.clearTasksMessagesAction()));

    const delMsgStateSub = this.store
      .select(TasksState.getTaskDeleteMessage)
      .pipe(
        filter((message) => message !== null),
        mergeMap((message) => this.toastr.warning(message).onHidden)
      )
      .subscribe(() => this.store.dispatch(TasksActions.clearTasksMessagesAction()));

    this.subscriptions.add(successMsgStateSub).add(delMsgStateSub);
  }

  private subToAnimationState() {
    const animationStateSub = this.store
      .select(TasksState.getAnimationState)
      .subscribe((state) => (this.disableAnimation = state));
    this.subscriptions.add(animationStateSub);
  }

  captureAnimationDone() {
    !this.disableAnimation && this.store.dispatch(TasksActions.disableTasksAnimationsAction());
  }

  onDone(task: Task) {
    this.store.dispatch(TasksActions.doneTaskAction({ task }));
  }

  onDelete(task: Task) {
    this.store.dispatch(TasksActions.enableTasksAnimationsAction());
    this.store.dispatch(TasksActions.deleteTaskAction({ task }));
  }

  onUpdate(task: Task) {
    this.store.dispatch(TasksActions.selectTaskAction({ task }));
  }
}
