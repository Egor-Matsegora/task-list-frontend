import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { Task } from '@interfaces/task.interface';
import { enterAnimation, leaveAnimation } from '@app/animations/item-dropdown.animations';
import { fromEvent, Subscription, timer } from 'rxjs';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [useAnimation(enterAnimation)]),
      transition(':leave', [useAnimation(leaveAnimation)]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnDestroy {
  private clickSubscription: Subscription;
  private timerSubscription: Subscription;
  @Input() task: Task;
  @Output() done: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<Task> = new EventEmitter();
  isDone: boolean;
  isDeleted: boolean = false;
  isMenuVisible: boolean = false;

  constructor() {}

  ngOnDestroy(): void {
    this.clickSubscription && this.clickSubscription.unsubscribe();
    this.timerSubscription && this.timerSubscription.unsubscribe();
  }

  private closeMenu() {
    this.isMenuVisible = false;
    this.clickSubscription && this.clickSubscription.unsubscribe();
  }

  private subToWindowClick() {
    let count = 0;
    this.clickSubscription = fromEvent(window, 'click').subscribe((event: Event) => {
      count++;
      if (count > 1 && this.isMenuVisible) this.closeMenu();
    });
  }

  deleteNow() {
    this.delete.emit(this.task._id);
  }

  onDone() {
    this.done.emit(this.task);
  }

  changeMenuVisibility() {
    this.isMenuVisible = !this.isMenuVisible;
    if (this.isMenuVisible) {
      this.subToWindowClick();
    } else {
      this.clickSubscription && this.clickSubscription.unsubscribe();
    }
  }

  onDelete() {
    this.isDeleted = true;
    this.closeMenu();
    this.timerSubscription = timer(3000).subscribe(() => {
      this.isDeleted && this.delete.emit(this.task);
    });
  }

  onUpdate() {
    this.closeMenu();
    this.update.emit(this.task);
  }

  recoverTask() {
    this.isDeleted = false;
  }
}
