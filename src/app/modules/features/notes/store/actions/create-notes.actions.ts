import { createAction, props } from '@ngrx/store';
import { Note } from '@interfaces/note.interface';
import { NotesActionTypes } from './notes-action-types.enum';

export const createNoteAction = createAction(
  NotesActionTypes.CREATE_NOTE,
  props<{ note: { text: string; title: string } }>()
);

export const createNoteSuccessAction = createAction(
  NotesActionTypes.CREATE_NOTE_SUCCESS,
  props<{ note: Note; successMessage: string }>()
);

export const createNoteFailureAction = createAction(NotesActionTypes.CREATE_NOTE_FAILURE, props<{ error: string }>());
