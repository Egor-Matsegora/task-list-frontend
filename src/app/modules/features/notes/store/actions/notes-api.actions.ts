import { createAction, props } from '@ngrx/store';
import { Note } from '../models';
import { ActionTypes } from './notes-action-types.enum';

export const loadNotes = createAction(ActionTypes.LOAD_NOTES);

export const createNote = createAction(ActionTypes.CREATE_NOTE, props<{ note: Note }>());

export const updateNote = createAction(ActionTypes.UPDATE_NOTE, props<{ note: Note }>());

export const deleteNote = createAction(ActionTypes.DELETE_NOTE, props<{ note: Note }>());
