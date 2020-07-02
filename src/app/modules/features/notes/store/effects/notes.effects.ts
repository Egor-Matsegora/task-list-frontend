import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
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
      mergeMap(() => {
        return this.notesService.getUserNotes().pipe(
          map((notes) => NotesActions.loadNotesSuccess({ notes })),
          catchError((error) => of(NotesActions.loadNotesFailure({ error: 'Ошибка загрузки заметок' })))
        );
      })
    );
  });

  createNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesApiActions.createNote),
      concatMap((action) => {
        return this.notesService.createNote(action.note).pipe(
          map((note) => NotesActions.createNoteSuccess({ note })),
          catchError((error) => of(NotesActions.createNoteFailure({ error: 'Ошибка создания заметок' })))
        );
      })
    );
  });

  updateNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesApiActions.updateNote),
      concatMap((action) => {
        return this.notesService.updateNote(action.note).pipe(
          map((note) => NotesActions.updateNoteSuccess({ note })),
          catchError((error) => of(NotesActions.updateNoteFailure({ error: 'Ошибка редактирования заметки' })))
        );
      })
    );
  });

  deleteNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesApiActions.deleteNote),
      concatMap((action) => {
        return this.notesService.deleteNote(action.note).pipe(
          map(() => NotesActions.deleteNoteSuccess({ note: action.note })),
          catchError((error) => of(NotesActions.deleteNoteFailure({ error: 'Ошибка удаления заметки' })))
        );
      })
    );
  });
}
