import { Note } from '@interfaces/note.interface';
import { HttpErrorResponse } from '@angular/common/http';

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NotesService } from './notes.service';

import { getNotes } from '@tests/notes-db';

let notesService: NotesService;
let httpTestingController: HttpTestingController;

describe('NotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotesService],
    });

    notesService = TestBed.inject<any>(NotesService);
    httpTestingController = TestBed.inject<any>(HttpTestingController);
  });

  // constructor
  it('should be created', () => {
    expect(notesService).toBeTruthy();
    expect(httpTestingController).toBeTruthy();
  });

  // getUserNotes()
  it('should get all the notes', () => {
    notesService.getUserNotes().subscribe((notes: Note[]) => {
      expect(notes).toBeTruthy('no tasks returned');
      expect(notes.length).toBe(3);
      const note: Note = notes.find((note) => note._id === '5e81b36d50b35125fc9ded6b');
      expect(note.text).toEqual('это тестовая заметка без заголовка');
    });

    const request = httpTestingController.expectOne('/api/notes/');
    const notesList = getNotes();
    expect(request.request.method).toEqual('GET');
    request.flush(notesList);
  });

  // updateNote()
  it('should update note', () => {
    const changeNote: Note = {
      title: 'test title',
      _id: '5e81b36d50b35125fc9ded6b',
      text: 'test text',
      date: new Date('2020-03-30T08:53:01.154Z'),
      userId: '5e39158f712c5c2056e6e743',
    };

    notesService.updateNote(changeNote).subscribe((note) => {
      expect(note).toBeTruthy('no note returned');
      expect(note.title).toEqual('test title', 'note title not modified');
      expect(note.text).toEqual('test text', 'note test not modified');
    });

    const request = httpTestingController.expectOne('/api/notes/5e81b36d50b35125fc9ded6b');
    const noteItem = getNotes(0);
    expect(request.request.method).toEqual('PATCH');
    request.flush({ ...noteItem, ...changeNote });
  });

  // createTask()
  it('should create new note', () => {
    const noteData = {
      text: 'some text of note',
      title: null,
    };

    notesService.createNote(noteData).subscribe((note) => {
      expect(note).toBeTruthy();
      expect(note.text).toEqual(noteData.text);
    });

    const request = httpTestingController.expectOne('/api/notes/');
    expect(request.request.method).toEqual('POST');
    request.flush(noteData);
  });

  // deleteTask()
  it('should delete note', () => {
    const deleteNoteId = '5e81b36d50b35125fc9ded6b';

    notesService.deleteNote(deleteNoteId).subscribe((response) => {
      expect(response).toBeTruthy('no response returned');
      expect(response.success).toBeTruthy('no success property in response');
    });

    const request = httpTestingController.expectOne('/api/notes/5e81b36d50b35125fc9ded6b');
    expect(request.request.method).toEqual('DELETE');
    request.flush({ success: true });
  });

  // error handling
  it('should returns error when request is failed', () => {
    spyOn(console, 'error');

    notesService.getUserNotes().subscribe(
      () => fail('request shold be failed'),
      (error: HttpErrorResponse) => {
        expect(console.error).toHaveBeenCalled();
        expect(error.status).toBe(500);
      }
    );

    const request = httpTestingController.expectOne('/api/notes/');
    expect(request.request.method).toEqual('GET');
    request.flush('get all tasks failed', { status: 500, statusText: 'Internal Server Error' });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
