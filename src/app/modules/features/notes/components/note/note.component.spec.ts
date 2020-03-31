import { NOTES } from '@tests/notes-db';
import { SharedModule } from '@shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { NoteComponent } from './note.component';
import { By } from '@angular/platform-browser';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [NoteComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NoteComponent);
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
    component.note = NOTES[1];
    fixture.detectChanges();
    const titleElement = element.query(By.css('.note__title'));
    const textElement = element.query(By.css('.note__text'));
    expect(titleElement).toBeTruthy('note title displaing');
    expect(titleElement.nativeElement.innerText.toLowerCase()).toContain(
      NOTES[1].title.toLowerCase(),
      'note title are not displayed correctly'
    );
    expect(textElement).toBeTruthy('note text displaing');
    expect(textElement.nativeElement.innerText).toContain(NOTES[1].text, 'note text are not displayed correctly');
  });
});
