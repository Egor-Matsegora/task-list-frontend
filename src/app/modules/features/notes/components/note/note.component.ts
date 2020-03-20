import { leaveAnimation, enterAnimation } from '@app/animations/item-dropdown.animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '@interfaces/note.interface';
import { trigger, transition, useAnimation } from '@angular/animations';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [useAnimation(enterAnimation)]),
      transition(':leave', [useAnimation(leaveAnimation)])
    ])
  ]
})
export class NoteComponent {
  private clickSubscription: Subscription;
  @Input() note: Note;
  @Output() delete: EventEmitter<Note> = new EventEmitter();
  isMenuVisible: Boolean = false;

  constructor(private smartModal: NgxSmartModalService) {}

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
    this.closeMenu();
    this.delete.emit(this.note);
  }

  onUpdate() {
    const modal: NgxSmartModalComponent = this.smartModal.getModal('noteModal');
    if (!modal) return;
    modal.setData(this.note);
    modal.open();
  }
}
