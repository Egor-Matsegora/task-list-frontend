import { createAction, props } from '@ngrx/store';
import { Note } from '@interfaces/note.interface';
import { NotesActionTypes } from './notes-action-types.enum';

// select note for modal
export const selectNoteAction = createAction(NotesActionTypes.SELECT_NOTE, props<{ note: Note }>());

export const unselectNoteAction = createAction(NotesActionTypes.UNSELECT_NOTE);

// clear messages
export const clearNotesMessagesAction = createAction(NotesActionTypes.CLEAR_MESSAGES);

// animation
export const disableNotesAnimationAction = createAction(NotesActionTypes.DISABLE_NOTES_ANIMATION);

export const enableNotesAnimationAction = createAction(NotesActionTypes.ENABLE_NOTES_ANIMATION);
