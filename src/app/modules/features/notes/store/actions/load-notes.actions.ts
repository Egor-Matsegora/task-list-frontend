import { createAction, props } from '@ngrx/store';
import { Note } from '@interfaces/note.interface';
import { NotesActionTypes } from './notes-action-types.enum';

export const loadNotesAction = createAction(NotesActionTypes.LOAD_NOTES);

export const loadNotesSuccessAction = createAction(NotesActionTypes.LOAD_NOTES_SUCCESS, props<{ notes: Note[] }>());

export const loadNotesFailureAction = createAction(NotesActionTypes.LOAD_NOTES_FAILURE, props<{ error: string }>());
