import { createAction, props } from '@ngrx/store';
import { Note } from '@interfaces/note.interface';
import { NotesActionTypes } from './notes-action-types.enum';

export const updateNoteAction = createAction(NotesActionTypes.UPDATE_NOTE, props<{ note: Note }>());

export const updateNoteSuccessAction = createAction(
  NotesActionTypes.UPDATE_NOTE_SUCCESS,
  props<{ note: Note; successMessage: string }>()
);

export const updateNoteFailureAction = createAction(NotesActionTypes.UPDATE_NOTE_FAILURE, props<{ error: string }>());
