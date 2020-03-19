import { leaveAnimation, enterAnimation } from './task.animations';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '@interfaces/note.interface';
import { trigger, transition, useAnimation } from '@angular/animations';
import { NgxSmartModalService } from 'ngx-smart-modal';

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
export class NoteComponent implements OnInit {
  @Input() note: Note;
  @Output() delete: EventEmitter<Note> = new EventEmitter();
  isMenuVisible: Boolean = false;

  constructor(private smartModal: NgxSmartModalService) {}

  ngOnInit() {}

  private openNoteModal() {
    const modal = this.smartModal.getModal('noteModal');
    modal && modal.open();
  }

  private closeMenu() {
    this.isMenuVisible = false;
  }

  changeMenuVisibility() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  onUpdate() {}

  onDelete() {
    this.closeMenu();
    this.delete.emit(this.note);
  }
}
