import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { NotesService } from '../../services/notes/notes.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadNotesAction, loadNotesSuccessAction, loadNotesFailureAction } from '../actions';

@Injectable()
export class LoadNotesEffects {
  constructor(private actions$: Actions, private notesService: NotesService) {}

  loadNotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNotesAction),
      mergeMap(() => {
        return this.notesService.getUserNotes().pipe(
          map((notes) => loadNotesSuccessAction({ notes })),
          catchError((err) => of(loadNotesFailureAction({ error: 'Ошибка загрузки заметок' })))
        );
      })
    );
  });
}
