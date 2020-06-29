import { createAction, props } from '@ngrx/store';
import { Note } from '@interfaces/note.interface';
import { ActionTypes } from './notes-action-types.enum';

export const deleteNote = createAction(ActionTypes.DELETE_NOTE, props<{ note: Note }>());

export const deleteNoteSuccess = createAction(
  ActionTypes.DELETE_NOTE_SUCCESS,
  props<{ success: boolean; message: string }>()
);

export const deleteNoteFailure = createAction(ActionTypes.DELETE_NOTE_FAILURE, props<{ error: any }>());
