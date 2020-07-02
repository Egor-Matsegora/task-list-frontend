import { createAction, props } from '@ngrx/store';
import { Note } from '../models';
import { ActionTypes } from './notes-action-types.enum';

export const selectNote = createAction(ActionTypes.SELECT_NOTE, props<{ note: Note }>());

export const unselectNote = createAction(ActionTypes.UNSELECT_NOTE);

export const loadNotesSuccess = createAction(ActionTypes.LOAD_NOTES_SUCCESS, props<{ notes: Note[] }>());

export const loadNotesFailure = createAction(ActionTypes.LOAD_NOTES_FAILURE, props<{ error: any }>());

export const createNoteSuccess = createAction(ActionTypes.CREATE_NOTE_SUCCESS, props<{ note: Note }>());

export const createNoteFailure = createAction(ActionTypes.CREATE_NOTE_FAILURE, props<{ error: any }>());

export const updateNoteSuccess = createAction(ActionTypes.UPDATE_NOTE_SUCCESS, props<{ note: Note }>());

export const updateNoteFailure = createAction(ActionTypes.UPDATE_NOTE_FAILURE, props<{ error: any }>());

export const deleteNoteSuccess = createAction(ActionTypes.DELETE_NOTE_SUCCESS, props<{ note: Note }>());

export const deleteNoteFailure = createAction(ActionTypes.DELETE_NOTE_FAILURE, props<{ error: any }>());
