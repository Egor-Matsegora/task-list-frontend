import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '@core/store/state/root-state.interface';
import { Note } from '@interfaces/note.interface';

export interface NotesState {
  notes: Note[];
  mainLoading: boolean;
  error: string | null;
  selectedNote: Note | null;
  noteLoading: boolean;
  successMessage: string | null;
  deleteMessage: string | null;
}

export const initialNotesState: NotesState = {
  notes: [],
  selectedNote: null,
  mainLoading: false,
  error: null,
  noteLoading: false,
  successMessage: null,
  deleteMessage: null,
};

export interface State extends RootState {
  notes: NotesState;
}

const getNotesFeatureState = createFeatureSelector<NotesState>('notes');

export const getNotes = createSelector(getNotesFeatureState, (state) => state.notes);

export const getSelectedNote = createSelector(getNotesFeatureState, (state) => state.selectedNote);

export const getNotesError = createSelector(getNotesFeatureState, (state) => state.error);

export const getNotesPageLoading = createSelector(getNotesFeatureState, (state) => state.mainLoading);

export const getNoteitemloading = createSelector(getNotesFeatureState, (state) => state.noteLoading);

export const hasNotes = createSelector(getNotesFeatureState, (state) => !!state.notes.length);

export const getSuccesMessage = createSelector(getNotesFeatureState, (state) => state.successMessage);

export const getDeleteMessage = createSelector(getNotesFeatureState, (state) => state.deleteMessage);
