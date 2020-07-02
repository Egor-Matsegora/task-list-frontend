import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Subscription, Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';
// services
import { ToastrService } from 'ngx-toastr';
// interfacess
import { Note } from '@interfaces/note.interface';
// animations
import { removeAnimation } from '@app/animations/item.animation';
// ngrx
import { Store } from '@ngrx/store';
import {
  State,
  getNotes,
  getNotesPageLoading,
  getNotesError,
  hasNotes,
  getDeleteMessage,
  getSuccesMessage,
} from '@features/notes/store/state';
import { NotesApiActions, NotesActions } from '@features/notes/store/actions';

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

  constructor(private toastr: ToastrService, private store: Store<State>, private smartModal: NgxSmartModalService) {}

  ngOnInit() {
    this.getNotesAsync();
    this.getLoadingStatus();
    this.getEmptyContentStatus();
    this.subToError();
    this.dispatchLoadAction();
    this.subToNotesSuccessMessages();
    this.subToNotesDeleteMessages();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }

  onDelete(note: Note) {
    this.store.dispatch(NotesApiActions.deleteNote({ note }));
  }

  onUpdate(note: Note) {
    const modal: NgxSmartModalComponent = this.smartModal.getModal('noteModal');
    if (!modal) return;
    modal.open();
    this.store.dispatch(NotesActions.selectNote({ note }));
  }

  private subToNotesSuccessMessages() {
    const notesSuccessMessageSub = this.store
      .select(getSuccesMessage)
      .pipe(
        filter((message) => message !== null),
        mergeMap((message) => this.toastr.success(message).onHidden)
      )
      .subscribe(() => this.store.dispatch(NotesActions.clearNotesMessages()));
    this.subscriptions.add(notesSuccessMessageSub);
  }

  private subToNotesDeleteMessages() {
    const notesSuccessMessageSub = this.store
      .select(getDeleteMessage)
      .pipe(
        filter((message) => message !== null),
        mergeMap((message) => this.toastr.warning(message).onHidden)
      )
      .subscribe(() => this.store.dispatch(NotesActions.clearNotesMessages()));
    this.subscriptions.add(notesSuccessMessageSub);
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
