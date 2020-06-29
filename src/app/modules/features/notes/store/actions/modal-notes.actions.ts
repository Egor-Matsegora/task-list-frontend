import { createAction, props } from '@ngrx/store';
import { Note } from '@interfaces/note.interface';
import { ActionTypes } from './notes-action-types.enum';

export const selectNote = createAction(ActionTypes.SELECT_NOTE, props<{ note: Note }>());
