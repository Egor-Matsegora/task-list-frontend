import { NgxSmartModalService } from 'ngx-smart-modal';
import { UiKitModule } from './../../../../shared/ui-kit/ui-kit.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesHeaderComponent } from './notes-header.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('NotesHeaderComponent', () => {
  let component: NotesHeaderComponent;
  let fixture: ComponentFixture<NotesHeaderComponent>;
  let element: DebugElement;
  let smartModal: any;
  const smartModalSpy: any = jasmine.createSpyObj('NgxSmartModalService', ['getModal']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NgxSmartModalService, useValue: smartModalSpy }],
      imports: [UiKitModule],
      declarations: [NotesHeaderComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NotesHeaderComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        smartModal = TestBed.get(NgxSmartModalService);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal on button click', () => {
    const button = element.query(By.css('ui-button'));
  });
});
