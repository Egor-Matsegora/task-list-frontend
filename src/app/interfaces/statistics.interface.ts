export interface NotesStatistics {
  notesStat: Array<{ date: string; notesNumber: number }>;
  allNotesNumber: number;
}

export interface TasksStatistics {
  tasksStat: Array<{ date: string; tasksNumber: number; doneTasksNumber: number }>;
  allTasksNumber: number;
  allDoneTasksNumber: number;
}

export interface Statistics {
  notes: NotesStatistics;
  tasks: TasksStatistics;
}
