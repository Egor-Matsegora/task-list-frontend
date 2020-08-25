import { createReducer, on, Action } from '@ngrx/store';
import * as NotesActions from '../actions';
import { NotesState } from '../state';

export const initialNotesState: NotesState = {
  notes: [],
  selectedNote: null,
  mainLoading: false,
  error: null,
  noteLoading: false,
  successMessage: null,
  deleteMessage: null,
  disableAnimation: true,
};

const reducer = createReducer<NotesState>(
  initialNotesState,
  // load notes
  on(NotesActions.loadNotesAction, (state) => ({ ...state, mainLoading: true })),
  on(
    NotesActions.loadNotesSuccessAction,
    (state, { notes }): NotesState => ({
      ...state,
      notes,
      mainLoading: false,
      error: null,
    })
  ),
  on(NotesActions.loadNotesFailureAction, (state, { error }): NotesState => ({ ...state, error, mainLoading: false })),
  // create note
  on(NotesActions.createNoteAction, (state, { note }) => ({ ...state, noteLoading: true })),
  on(
    NotesActions.createNoteSuccessAction,
    (state, { note, successMessage }): NotesState => ({
      ...state,
      notes: [...state.notes, note],
      error: null,
      noteLoading: false,
      successMessage,
    })
  ),
  on(NotesActions.createNoteFailureAction, (state, { error }): NotesState => ({ ...state, error, noteLoading: false })),
  // update note
  on(NotesActions.updateNoteAction, (state, { note }): NotesState => ({ ...state, noteLoading: true })),
  on(
    NotesActions.updateNoteSuccessAction,
    (state, { note, successMessage }): NotesState => ({
      ...state,
      notes: state.notes.map((item) => (item._id === note._id ? note : item)),
      selectedNote: null,
      error: null,
      noteLoading: false,
      successMessage,
    })
  ),
  on(NotesActions.updateNoteFailureAction, (state, { error }): NotesState => ({ ...state, error, noteLoading: false })),
  // delete note
  on(NotesActions.deleteNoteAction, (state, { note }): NotesState => ({ ...state, noteLoading: true })),
  on(
    NotesActions.deleteNoteSuccessAction,
    (state, { note, deleteMessage }): NotesState => ({
      ...state,
      notes: state.notes.filter((item) => item._id !== note._id),
      error: null,
      noteLoading: false,
      deleteMessage,
    })
  ),
  on(NotesActions.deleteNoteFailureAction, (state, { error }): NotesState => ({ ...state, error, noteLoading: false })),
  // select note for modal
  on(NotesActions.selectNoteAction, (state, { note }): NotesState => ({ ...state, selectedNote: note })),
  on(NotesActions.unselectNoteAction, (state): NotesState => ({ ...state, selectedNote: null })),
  // clear all messages
  on(NotesActions.clearNotesMessagesAction, (state) => {
    return { ...state, successMessage: null, deleteMessage: null, error: null };
  }),
  // animations
  on(NotesActions.disableNotesAnimationAction, (state): NotesState => ({ ...state, disableAnimation: true })),
  on(NotesActions.enableNotesAnimationAction, (state): NotesState => ({ ...state, disableAnimation: false }))
);

export function notesReducer(state: NotesState | undefined, action: Action) {
  return reducer(state, action);
}
