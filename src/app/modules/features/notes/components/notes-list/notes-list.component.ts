import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Subscription, Observable } from 'rxjs';
// services
import { ToastrService } from 'ngx-toastr';
// interfacess
import { Note } from '@interfaces/note.interface';
// animations
import { removeAnimation } from '@app/animations/item.animation';
// ngrx
import { Store } from '@ngrx/store';
import { State, getNotes, getNotesPageLoading, getNotesError, hasNotes } from '@features/notes/store/state';
import { NotesApiActions } from '@features/notes/store/actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [trigger('itemAnimation', [transition(':leave', [useAnimation(removeAnimation)])])],
})
export class NotesListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  items$: Observable<Note[]>;
  isLoading: boolean = false;
  error$: Observable<any>;
  hasContent: boolean;

  constructor(private toastr: ToastrService, private store: Store<State>) {}

  ngOnInit() {
    this.getNotesAsync();
    this.getLoadingStatus();
    this.getEmptyContentStatus();
    this.subToError();
    this.dispatchLoadAction();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }

  onDelete(note: Note) {
    this.store.dispatch(NotesApiActions.deleteNote({ note }));
  }

  private getLoadingStatus() {
    const storeLoadingSub = this.store.select(getNotesPageLoading).subscribe((status) => (this.isLoading = status));
    this.subscriptions.add(storeLoadingSub);
  }

  private getEmptyContentStatus() {
    const storeContentSub = this.store.select(hasNotes).subscribe((status) => (this.hasContent = status));
    this.subscriptions.add(storeContentSub);
  }

  private getNotesAsync() {
    this.items$ = this.store.select(getNotes);
  }

  private subToError() {
    this.store
      .select(getNotesError)
      .pipe(filter((error) => error !== null))
      .subscribe((error) => this.toastr.error(error));
  }

  private dispatchLoadAction() {
    this.store.dispatch(NotesApiActions.loadNotes());
  }
}
