import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NOTES } from '@tests/notes-db';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { SharedModule } from './../../../../shared/shared.module';

import { NotesListComponent } from './notes-list.component';
import { NoteComponent } from './../note/note.component';

import { NotesService } from './../../services/notes/notes.service';
import { ToastrService } from 'ngx-toastr';

describe('NotesListComponent', () => {
  let component: NotesListComponent;
  let fixture: ComponentFixture<NotesListComponent>;
  let element: DebugElement;
  let notesService: any;
  let toastrService: any;
  const notesList = NOTES;
  const deleteNote = NOTES[0];
  const notesListWhenDelete = NOTES;

  beforeEach(async(() => {
    const notesServiceSpy = jasmine.createSpyObj('NotesService', ['getUserNotes', 'createNoteState$', 'deleteNote']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error', 'warning']);

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [NotesListComponent, NoteComponent],
      providers: [
        { provide: NotesService, useValue: notesServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NotesListComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        toastrService = TestBed.get(ToastrService);
        notesService = TestBed.get(NotesService);
      })
      .catch(error => console.error(error));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of notes', () => {
    notesService.createNoteState$ = of(null);
    notesService.getUserNotes.and.returnValue(of(notesList));
    fixture.detectChanges();

    const notes = element.queryAll(By.css('.notes-list__item'));

    expect(notes).toBeTruthy('notes not found');
    expect(notes.length).toBe(3, 'unexpected number of notes');
  });

  // it('should display an error about loading notes on the screen', () => {});

  it('sould display message when there is no notes found', () => {
    notesService.createNoteState$ = of(null);
    notesService.getUserNotes.and.returnValue(of([]));
    fixture.detectChanges();

    const message = element.queryAll(By.css('.notes-list__message'));
    const notes = element.queryAll(By.css('.notes-list__item'));

    expect(message).toBeTruthy('message are not displaying');
    expect(message.length).toBe(1, 'must be only one message');
    expect(notes.length).toBe(0, 'notes length must be 0 in this case');
  });

  xit('should remove single note when delete is emitted', () => {
    notesService.createNoteState$ = of(null);
    notesService.getUserNotes.and.returnValue(of(notesListWhenDelete));
    fixture.detectChanges();
    notesService.deleteNote.and.returnValue(of({ success: true }));
    component.onDelete(deleteNote);
    toastrService.warning.withArgs('Задача успешно удалена');
    fixture.detectChanges();

    const notes = element.queryAll(By.css('.notes-list__item'));
    expect(notes.length).toBe(2, 'notes length must bee smaller then before deleting');
    expect(toastrService.warning).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
