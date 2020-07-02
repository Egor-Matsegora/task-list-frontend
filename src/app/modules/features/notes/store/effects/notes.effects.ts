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
          catchError((err) => of(NotesActions.loadNotesFailure({ error: 'Ошибка загрузки заметок' })))
        );
      })
    );
  });

  createNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesApiActions.createNote),
      concatMap((action) => {
        return this.notesService.createNote(action.note).pipe(
          map((note) => NotesActions.createNoteSuccess({ note, successMessage: 'Заметка успешно создана' })),
          catchError((err) => of(NotesActions.createNoteFailure({ error: 'Ошибка создания заметок' })))
        );
      })
    );
  });

  updateNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesApiActions.updateNote),
      concatMap((action) => {
        return this.notesService.updateNote(action.note).pipe(
          map((note) => NotesActions.updateNoteSuccess({ note, successMessage: 'Заметка успешно обновлена' })),
          catchError((err) => of(NotesActions.updateNoteFailure({ error: 'Ошибка редактирования заметки' })))
        );
      })
    );
  });

  deleteNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesApiActions.deleteNote),
      concatMap((action) => {
        return this.notesService.deleteNote(action.note).pipe(
          map(() => NotesActions.deleteNoteSuccess({ note: action.note, deleteMessage: 'Заметка успешно удалена' })),
          catchError((err) => of(NotesActions.deleteNoteFailure({ error: 'Ошибка удаления заметки' })))
        );
      })
    );
  });
}
