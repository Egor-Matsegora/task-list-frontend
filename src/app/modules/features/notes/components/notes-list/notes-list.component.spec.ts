import { SharedModule } from './../../../../shared/shared.module';
import { of } from 'rxjs';
import { NotesService } from './../../services/notes/notes.service';
import { UiKitModule } from './../../../../shared/ui-kit/ui-kit.module';
import { NoteComponent } from './../note/note.component';
import { NOTES } from '@tests/notes-db';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesListComponent } from './notes-list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';

fdescribe('NotesListComponent', () => {
  let component: NotesListComponent;
  let fixture: ComponentFixture<NotesListComponent>;
  let element: DebugElement;
  let notesService: any;
  let toastrService: any;

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
    notesService.getUserNotes.and.returnValue(of(NOTES));
    fixture.detectChanges();

    const notes = element.queryAll(By.css('.notes-list__item'));

    expect(notes).toBeTruthy('notes no found');
    expect(notes.length).toBe(3, 'unexpected number of notes');
  });

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
    notesService.getUserNotes.and.returnValue(of(NOTES));
    notesService.deleteNote.and.returnValue(of({ sucess: true }));
    fixture.detectChanges();
    component.onDelete(NOTES[0]);

    const notes = element.queryAll(By.css('.notes-list__item'));
    expect(notes.length).toBe(2, 'notes length must bee smaller then before deleting');
  });
});
