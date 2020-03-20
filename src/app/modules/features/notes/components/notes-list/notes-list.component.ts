import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from '@interfaces/note.interface';
import { NotesService } from '../../services/notes/notes.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
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
    console.log(index);
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
