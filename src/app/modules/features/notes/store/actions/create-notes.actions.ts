import { createAction, props } from '@ngrx/store';
import { Note } from '@interfaces/note.interface';
import { ActionTypes } from './notes-action-types.enum';

export const createNote = createAction(ActionTypes.CREATE_NOTE, props<{ note: Note }>());

export const createNoteSuccess = createAction(ActionTypes.CREATE_NOTE_SUCCESS, props<{ note: Note }>());

export const createNoteFailure = createAction(ActionTypes.CREATE_NOTE_FAILURE, props<{ error: any }>());
