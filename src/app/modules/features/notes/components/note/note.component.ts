import { leaveAnimation, enterAnimation } from '@app/animations/item-dropdown.animations';
import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Note } from '@interfaces/note.interface';
import { trigger, transition, useAnimation } from '@angular/animations';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';
import { Subscription, fromEvent, timer } from 'rxjs';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [useAnimation(enterAnimation)]),
      transition(':leave', [useAnimation(leaveAnimation)]),
    ]),
  ],
})
export class NoteComponent implements OnDestroy {
  private clickSubscription: Subscription;
  private timerSubscription: Subscription;
  @Input() note: Note;
  @Output() delete: EventEmitter<Note> = new EventEmitter();
  @Output() update: EventEmitter<Note> = new EventEmitter();
  isMenuVisible: Boolean = false;
  isDeleted: boolean = false;

  constructor(private smartModal: NgxSmartModalService) {}

  ngOnDestroy() {
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
      this.isDeleted && this.delete.emit(this.note);
    });
  }

  recoverTask() {
    this.isDeleted = false;
  }

  deleteNow() {
    this.delete.emit(this.note);
  }

  onUpdate() {
    this.update.emit(this.note);
  }
}
