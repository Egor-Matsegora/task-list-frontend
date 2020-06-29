import { createAction, props } from '@ngrx/store';
import { Note } from '@interfaces/note.interface';
import { ActionTypes } from './notes-action-types.enum';

export const loadNotes = createAction(ActionTypes.LOAD_NOTES);

export const loadNotesSuccess = createAction(ActionTypes.LOAD_NOTES_SUCCESS, props<{ notes: Note[] }>());

export const loadNotesFailure = createAction(ActionTypes.LOAD_NOTES_FAILURE, props<{ error: any }>());
