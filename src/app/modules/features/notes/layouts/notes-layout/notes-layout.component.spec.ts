import { NotesModule } from './../../notes.module';
import { SharedModule } from '@shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesLayoutComponent } from './notes-layout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotesLayoutComponent', () => {
  let component: NotesLayoutComponent;
  let fixture: ComponentFixture<NotesLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NotesModule, HttpClientTestingModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NotesLayoutComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
