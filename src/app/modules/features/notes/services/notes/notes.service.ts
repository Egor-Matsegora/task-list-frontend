import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
// interfaces
import { Note } from '@interfaces/note.interface';
// helpers
import { handleHttpError } from '@helpers/handle-http-error';

@Injectable()
export class NotesService {
  private url: string = 'http://localhost:5000/api/notes/';
  // data subjects
  private createNoteState: BehaviorSubject<Note> = new BehaviorSubject(null);
  createNoteState$: Observable<Note> = this.createNoteState.asObservable().pipe(filter(task => task !== null));

  constructor(private http: HttpClient) {}

  createNoteAction(note) {
    this.createNoteState.next(note);
  }

  // http methods
  getUserNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.url).pipe(catchError(error => handleHttpError(error)));
  }

  createNote(note): Observable<Note> {
    return this.http.post<Note>(this.url, note).pipe(catchError(error => handleHttpError(error)));
  }

  deleteNote(id): Observable<any> {
    return this.http.delete(this.url + id).pipe(catchError(error => handleHttpError(error)));
  }
}
