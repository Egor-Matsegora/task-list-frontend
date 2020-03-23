import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Subscription } from 'rxjs';
// services
import { NotesService } from '@features/notes/services/notes/notes.service';
import { ToastrService } from 'ngx-toastr';
// interfacess
import { Note } from '@interfaces/note.interface';
// animations
import { removeAnimation } from '@app/animations/item.animation';

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [trigger('itemAnimation', [transition(':leave', [useAnimation(removeAnimation)])])]
})
export class NotesListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  items: Note[] = [];
  isLoading: boolean = false;

  constructor(private notesService: NotesService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getNotes();
    this.subToCreateNoteState();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }

  private getNotes() {
    this.isLoading = true;
    this.subscriptions.add(
      this.notesService.getUserNotes().subscribe(
        notes => {
          this.isLoading = false;
          this.items = notes;
        },
        error => {
          this.isLoading = false;
          this.toastr.error('Ошибка загрузки');
        }
      )
    );
  }

  private subToCreateNoteState() {
    this.subscriptions.add(this.notesService.createNoteState$.subscribe(note => this.items.push(note)));
  }

  onDelete(note: Note) {
    const index = this.items.indexOf(note);
    this.subscriptions.add(
      this.notesService.deleteNote(note._id).subscribe(
        response => {
          if (!response.success) return;
          this.items.splice(index, 1);
          this.toastr.warning('Задача успешно удалена');
        },
        error => this.toastr.error('Ошибка удаления задачи')
      )
    );
  }
}
