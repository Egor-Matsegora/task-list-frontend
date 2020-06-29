import { createAction, props } from '@ngrx/store';
import { Note } from '@interfaces/note.interface';
import { ActionTypes } from './notes-action-types.enum';

export const updateNote = createAction(ActionTypes.UPDATE_NOTE, props<{ note: Note }>());

export const updateNoteSuccess = createAction(ActionTypes.UPDATE_NOTE_SUCCESS, props<{ note: Note }>());

export const updateNoteFailure = createAction(ActionTypes.UPDATE_NOTE_FAILURE, props<{ error: any }>());
