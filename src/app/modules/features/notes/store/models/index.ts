export interface Note {
  text: string;
  title?: string;
  date: Date;
  userId?: string;
  _id?: string;
}

export interface NotesState {
  notes: Note[];
  mainLoading: boolean;
  error: string | null;
  selectedNote: Note | null;
  noteLoading: boolean;
  successMessage: string | null;
  deleteMessage: string | null;
}
