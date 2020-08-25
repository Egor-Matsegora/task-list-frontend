import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { NotesService } from '../../services/notes/notes.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createNoteAction, createNoteSuccessAction, createNoteFailureAction } from '../actions';

@Injectable()
export class CreateNotesEffects {
  constructor(private actions$: Actions, private notesService: NotesService) {}

  createNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createNoteAction),
      mergeMap((action) => {
        return this.notesService.createNote(action.note).pipe(
          map((note) => createNoteSuccessAction({ note, successMessage: 'Заметка успешно создана' })),
          catchError((err) => of(createNoteFailureAction({ error: 'Ошибка создания заметок' })))
        );
      })
    );
  });
}
