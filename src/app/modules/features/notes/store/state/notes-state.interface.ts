import { Note } from '@interfaces/note.interface';

export interface NotesState {
  notes: Note[];
  mainLoading: boolean;
  error: string | null;
  selectedNote: Note | null;
  noteLoading: boolean;
  successMessage: string | null;
  deleteMessage: string | null;
  disableAnimation: boolean;
}
