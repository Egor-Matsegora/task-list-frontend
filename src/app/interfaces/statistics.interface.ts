export interface NotesStatistics {
  notesStat: Array<{ date: string; notesNumber: number }>;
  allNotesNumber: number;
}

export interface TasksStatistics {}

export interface Statistics {
  notes: NotesStatistics;
  tasks: {};
}
