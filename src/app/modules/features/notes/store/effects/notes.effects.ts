import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, tap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { NotesService } from '../../services/notes/notes.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotesActions, NotesApiActions } from '../actions';

@Injectable()
export class NotesEffects {
  constructor(private actions$: Actions, private notesService: NotesService) {}

  loadNotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesApiActions.loadNotes),
      tap(() => NotesActions.activateLoadingNotes()),
      mergeMap(() => {
        return this.notesService.getUserNotes().pipe(
          map((notes) => NotesActions.loadNotesSuccess({ notes })),
          catchError((error) => of(NotesActions.loadNotesFailure({ error })))
        );
      })
    );
  });

  createNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesApiActions.createNote),
      tap(() => NotesActions.activateLoadingNotes()),
      concatMap((action) => {
        return this.notesService.createNote(action.note).pipe(
          map((note) => NotesActions.createNoteSuccess({ note })),
          catchError((error) => of(NotesActions.createNoteFailure({ error })))
        );
      })
    );
  });

  updateNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesApiActions.updateNote),
      tap(() => NotesActions.activateLoadingNotes()),
      concatMap((action) => {
        return this.notesService.updateNote(action.note).pipe(
          map((note) => NotesActions.updateNoteSuccess({ note })),
          catchError((error) => of(NotesActions.updateNoteFailure({ error })))
        );
      })
    );
  });

  deleteNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesApiActions.deleteNote),
      tap(() => NotesActions.activateLoadingNotes()),
      concatMap((action) => {
        return this.notesService.deleteNote(action.note).pipe(
          map(() => NotesActions.deleteNoteSuccess({ note: action.note })),
          catchError((error) => of(NotesActions.deleteNoteFailure(error)))
        );
      })
    );
  });
}
