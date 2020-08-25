import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { NotesService } from '../../services/notes/notes.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { deleteNoteAction, deleteNoteSuccessAction, deleteNoteFailureAction } from '../actions';

@Injectable()
export class DeleteNotesEffects {
  constructor(private actions$: Actions, private notesService: NotesService) {}

  deleteNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteNoteAction),
      mergeMap((action) => {
        return this.notesService.deleteNote(action.note).pipe(
          map(() => deleteNoteSuccessAction({ note: action.note, deleteMessage: 'Заметка успешно удалена' })),
          catchError((err) => of(deleteNoteFailureAction({ error: 'Ошибка удаления заметки' })))
        );
      })
    );
  });
}
