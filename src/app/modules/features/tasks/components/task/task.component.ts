import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
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
      transition(':leave', [useAnimation(leaveAnimation)])
    ])
  ]
})
export class TaskComponent implements OnChanges, OnDestroy {
  private clickSubscription: Subscription;
  private timerSubscription: Subscription;
  @Input() task: Task;
  @Output() done: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  isDone: boolean;
  isDeleted: boolean = false;
  isMenuVisible: boolean = false;

  constructor(private smartModal: NgxSmartModalService) {}

  ngOnChanges() {
    this.isDone = this.task.done;
  }

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
    this.isDone = !this.isDone;
    this.done.emit({ id: this.task._id, done: this.isDone });
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
      this.isDeleted && this.delete.emit(this.task._id);
    });
  }

  onUpdate() {
    this.closeMenu();
    const taskModal = this.smartModal.getModal('taskModal');
    if (!taskModal) return;
    taskModal.setData(this.task);
    taskModal.open();
  }

  recoverTask() {
    this.isDeleted = false;
  }
}
