import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { NotesService } from '../../services/notes/notes.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updateNoteAction, updateNoteSuccessAction, updateNoteFailureAction } from '../actions';

@Injectable()
export class UpdateNotesEffects {
  constructor(private actions$: Actions, private notesService: NotesService) {}

  updateNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateNoteAction),
      mergeMap((action) => {
        return this.notesService.updateNote(action.note).pipe(
          map((note) => updateNoteSuccessAction({ note, successMessage: 'Заметка успешно обновлена' })),
          catchError((err) => of(updateNoteFailureAction({ error: 'Ошибка редактирования заметки' })))
        );
      })
    );
  });
}
