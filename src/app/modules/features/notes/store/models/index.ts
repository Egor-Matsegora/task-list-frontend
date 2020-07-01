export interface Note {
  text: string;
  title?: string;
  date: Date;
  userId?: string;
  _id?: string;
}

export interface NotesState {
  notes: Note[];
  isLoading: boolean;
  error: any | null;
  selectedNote: Note | null;
}
