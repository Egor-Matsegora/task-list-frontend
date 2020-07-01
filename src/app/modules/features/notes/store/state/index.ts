import { NotesState } from './../models';

export const initialNotesState: NotesState = {
  notes: [],
  selectedNote: null,
  isLoading: false,
  error: null,
};
