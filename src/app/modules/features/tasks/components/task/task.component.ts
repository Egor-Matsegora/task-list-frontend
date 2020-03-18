import { enterAnimation, leaveAnimation } from './task.animations';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { Task } from '@interfaces/task.interface';
import { trigger, transition, useAnimation } from '@angular/animations';

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
export class TaskComponent implements OnChanges {
  @Input() task: Task;
  @Output() done: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  isDone: boolean;
  isMenuVisible: boolean = false;

  ngOnChanges() {
    this.isDone = this.task.done;
  }

  onDone() {
    this.isDone = !this.isDone;
    this.done.emit({ id: this.task._id, done: this.isDone });
  }

  changeMenuVisibility() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  onDelete() {
    this.closeMenu();
  }

  private closeMenu() {
    this.isMenuVisible = false;
  }
}
