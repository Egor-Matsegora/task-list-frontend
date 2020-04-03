import { NgxSmartModalService } from 'ngx-smart-modal';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getNotes } from '@tests/notes-db';
import { SharedModule } from '@shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { NoteComponent } from './note.component';
import { By } from '@angular/platform-browser';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;
  let element: DebugElement;
  let smartModal: any;
  const displayNote = getNotes(1);

  beforeEach(async(() => {
    const smartModalSpy = jasmine.createSpyObj('NgxSmartModalService', ['getModal']);

    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [NoteComponent],
      providers: [{ provide: NgxSmartModalService, useValue: smartModalSpy }]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NoteComponent);
        smartModal = TestBed.get(NgxSmartModalService);
        component = fixture.componentInstance;
        element = fixture.debugElement;
      });
  }));

  it('should create', () => {
    const noteContainer = element.query(By.css('.note'));
    expect(component).toBeTruthy();
    expect(noteContainer).toBeTruthy('component not displayed');
  });

  it('shold display note', () => {
    component.note = displayNote;
    fixture.detectChanges();

    const titleElement = element.query(By.css('.note__title'));
    const textElement = element.query(By.css('.note__text'));
    const noteDate = element.queryAll(By.css('.note__date'));

    expect(titleElement).toBeTruthy('note title not displaing');
    expect(titleElement.nativeElement.innerText.toLowerCase()).toContain(
      displayNote.title.toLowerCase(),
      'note title are not displayed correctly'
    );
    expect(textElement).toBeTruthy('note text displaing');
    expect(textElement.nativeElement.innerText).toContain(displayNote.text, 'note text are not displayed correctly');

    expect(noteDate).toBeTruthy('note date is not displayed');
    expect(noteDate.length).toBe(1, 'unexpectet number of notes');
    expect(noteDate[0].nativeElement.innerText).toEqual('Mar 30, 2020');
  });

  it('should open a menu on click', () => {
    component.note = displayNote;
    component.changeMenuVisibility();
    fixture.detectChanges();

    const dropdownMenu = element.queryAll(By.css('.dropdown'));

    expect(dropdownMenu).toBeTruthy('menu dont displaing');
    expect(dropdownMenu.length).toBe(1, 'unexpected number of menu');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
