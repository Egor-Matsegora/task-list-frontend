import { createAction, props } from '@ngrx/store';
import { Note } from '../models';
import { ActionTypes } from './notes-action-types.enum';

// select note for modal
export const selectNote = createAction(ActionTypes.SELECT_NOTE, props<{ note: Note }>());

export const unselectNote = createAction(ActionTypes.UNSELECT_NOTE);

// load notes
export const loadNotesSuccess = createAction(ActionTypes.LOAD_NOTES_SUCCESS, props<{ notes: Note[] }>());

export const loadNotesFailure = createAction(ActionTypes.LOAD_NOTES_FAILURE, props<{ error: string }>());

// create note
export const createNoteSuccess = createAction(
  ActionTypes.CREATE_NOTE_SUCCESS,
  props<{ note: Note; successMessage: string }>()
);

export const createNoteFailure = createAction(ActionTypes.CREATE_NOTE_FAILURE, props<{ error: string }>());

// update note
export const updateNoteSuccess = createAction(
  ActionTypes.UPDATE_NOTE_SUCCESS,
  props<{ note: Note; successMessage: string }>()
);

export const updateNoteFailure = createAction(ActionTypes.UPDATE_NOTE_FAILURE, props<{ error: string }>());

// delete note
export const deleteNoteSuccess = createAction(
  ActionTypes.DELETE_NOTE_SUCCESS,
  props<{ note: Note; deleteMessage: string }>()
);

export const deleteNoteFailure = createAction(ActionTypes.DELETE_NOTE_FAILURE, props<{ error: string }>());

// clear messages
export const clearNotesMessages = createAction(ActionTypes.CLEAR_MESSAGES);
