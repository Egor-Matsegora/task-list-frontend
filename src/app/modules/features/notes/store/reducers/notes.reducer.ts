import { createReducer, on, Action } from '@ngrx/store';
import { initialNotesState } from '../state';
import { NotesActions } from '../actions';
import { NotesState } from '../models';

const reducer = createReducer<NotesState>(
  initialNotesState,
  on(NotesActions.loadNotesSuccess, (state, { notes }) => ({ ...state, notes, isLoading: false, error: null })),
  on(NotesActions.loadNotesFailure, (state, { error }) => ({ ...state, error, isLoading: false })),
  on(NotesActions.createNoteSuccess, (state, { note }) => ({ ...state, notes: [note, ...state.notes], error: null })),
  on(NotesActions.createNoteFailure, (state, { error }) => ({ ...state, error, isLoading: false })),
  on(NotesActions.updateNoteSuccess, (state, { note }) => ({
    ...state,
    notes: state.notes.map((item) => (item._id === note._id ? note : item)),
    selectedNote: null,
    error: null,
    isLoading: false,
  })),
  on(NotesActions.updateNoteFailure, (state, { error }) => ({ ...state, error, isLoading: false })),
  on(NotesActions.deleteNoteSuccess, (state, { note }) => ({
    ...state,
    notes: state.notes.filter((item) => item._id !== note._id),
    error: null,
    isLoading: false,
  })),
  on(NotesActions.deleteNoteFailure, (state, error) => ({ ...state, error, isLoading: false })),
  on(NotesActions.selectNote, (state, { note }) => ({ ...state, selectedNote: note })),
  on(NotesActions.unselectNote, (state) => ({ ...state, selectedNote: null })),
  on(NotesActions.activateLoadingNotes, (state) => ({ ...state, isLoading: true }))
);

export function notesReducer(state: NotesState | undefined, action: Action) {
  return reducer(state, action);
}
