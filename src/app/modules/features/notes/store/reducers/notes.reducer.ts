import { createReducer, on, Action } from '@ngrx/store';
import { initialNotesState } from '../state';
import { NotesActions, NotesApiActions } from '../actions';
import { NotesState } from '../state';

const reducer = createReducer<NotesState>(
  initialNotesState,
  // load notes
  on(NotesApiActions.loadNotes, (state) => ({ ...state, mainLoading: true })),
  on(
    NotesActions.loadNotesSuccess,
    (state, { notes }): NotesState => ({
      ...state,
      notes,
      mainLoading: false,
      error: null,
    })
  ),
  on(NotesActions.loadNotesFailure, (state, { error }): NotesState => ({ ...state, error, mainLoading: false })),
  // create note
  on(NotesApiActions.createNote, (state, { note }) => ({ ...state, noteLoading: true })),
  on(
    NotesActions.createNoteSuccess,
    (state, { note, successMessage }): NotesState => ({
      ...state,
      notes: [...state.notes, note],
      error: null,
      noteLoading: false,
      successMessage,
    })
  ),
  on(NotesActions.createNoteFailure, (state, { error }): NotesState => ({ ...state, error, noteLoading: false })),
  // update note
  on(NotesApiActions.updateNote, (state, { note }): NotesState => ({ ...state, noteLoading: true })),
  on(
    NotesActions.updateNoteSuccess,
    (state, { note, successMessage }): NotesState => ({
      ...state,
      notes: state.notes.map((item) => (item._id === note._id ? note : item)),
      selectedNote: null,
      error: null,
      noteLoading: false,
      successMessage,
    })
  ),
  on(NotesActions.updateNoteFailure, (state, { error }): NotesState => ({ ...state, error, noteLoading: false })),
  // delete note
  on(NotesApiActions.deleteNote, (state, { note }): NotesState => ({ ...state, noteLoading: true })),
  on(
    NotesActions.deleteNoteSuccess,
    (state, { note, deleteMessage }): NotesState => ({
      ...state,
      notes: state.notes.filter((item) => item._id !== note._id),
      error: null,
      noteLoading: false,
      deleteMessage,
    })
  ),
  on(NotesActions.deleteNoteFailure, (state, { error }): NotesState => ({ ...state, error, noteLoading: false })),
  // select note for modal
  on(NotesActions.selectNote, (state, { note }): NotesState => ({ ...state, selectedNote: note })),
  on(NotesActions.unselectNote, (state): NotesState => ({ ...state, selectedNote: null })),
  // clear all messages
  on(NotesActions.clearNotesMessages, (state) => ({ ...state, successMessage: null, deleteMessage: null, error: null }))
);

export function notesReducer(state: NotesState | undefined, action: Action) {
  return reducer(state, action);
}
