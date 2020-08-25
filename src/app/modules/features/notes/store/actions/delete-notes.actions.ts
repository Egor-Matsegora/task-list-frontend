import { createAction, props } from '@ngrx/store';
import { Note } from '@interfaces/note.interface';
import { NotesActionTypes } from './notes-action-types.enum';

export const deleteNoteAction = createAction(NotesActionTypes.DELETE_NOTE, props<{ note: Note }>());

export const deleteNoteSuccessAction = createAction(
  NotesActionTypes.DELETE_NOTE_SUCCESS,
  props<{ note: Note; deleteMessage: string }>()
);

export const deleteNoteFailureAction = createAction(NotesActionTypes.DELETE_NOTE_FAILURE, props<{ error: string }>());
