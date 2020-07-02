import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
// interfaces
import { Note } from '@interfaces/note.interface';
// helpers
import { handleHttpError } from '@helpers/handle-http-error';

@Injectable()
export class NotesService {
  private url: string = '/api/notes/';

  constructor(private http: HttpClient) {}

  getUserNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.url).pipe(catchError((error) => handleHttpError(error)));
  }

  createNote(note: { title: string; text: string }): Observable<Note> {
    return this.http.post<Note>(this.url, note).pipe(catchError((error) => handleHttpError(error)));
  }

  deleteNote(note: Note): Observable<any> {
    return this.http.delete(this.url + note._id).pipe(catchError((error) => handleHttpError(error)));
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.patch(this.url + note._id, note).pipe(catchError((error) => handleHttpError(error)));
  }
}
