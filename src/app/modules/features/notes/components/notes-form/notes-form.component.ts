import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { transition, trigger, useAnimation } from '@angular/animations';
import { enterAnimation, leaveAnimation } from '@app/animations/dynamic-control.animation';
import { Subscription } from 'rxjs';
// plugins
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
// store
import { Store } from '@ngrx/store';
import * as NotesActions from '@features/notes/store/actions';
import { State, getSelectedNote, getNoteitemloading } from '../../store/state/notes.state';
// interfaces
import { Note } from '@interfaces/note.interface';

@Component({
  selector: 'notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss'],
  animations: [
    trigger('controlAnimation', [
      transition(':enter', [useAnimation(enterAnimation)]),
      transition(':leave', [useAnimation(leaveAnimation)]),
    ]),
  ],
})
export class NotesFormComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  form: FormGroup;
  noteText: FormControl;
  noteTitle: FormControl;
  titleCheck: FormControl;
  modal: NgxSmartModalComponent;
  selectedNote: Note;
  isNoteCreation: boolean;
  isLoading: boolean;

  constructor(private fb: FormBuilder, private smartModal: NgxSmartModalService, private store: Store<State>) {}

  ngOnInit() {
    this.initModal();
    this.inintForm();
    this.initFormVariables();
    this.setValidators();
    this.checkSelectedNote();
    this.subToNoteLoadingState();
    this.subToCloseModalEvent();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }

  /**
   * Подписка на состояние лоадера заметки
   */
  private subToNoteLoadingState() {
    const subToState = this.store.select(getNoteitemloading).subscribe((status) => {
      this.isLoading = status;
      !status && this.afterLoadingEnd();
    });
    this.subscriptions.add(subToState);
  }

  /**
   * Инициализация переменной модалки
   */
  private initModal() {
    this.modal = this.smartModal.getModal('noteModal');
  }

  /**
   * Подписка на закрытие модалки для сброса формы и данных, приходящих в модалку
   */
  private subToCloseModalEvent() {
    const modalEventSub = this.modal.onAnyCloseEvent.subscribe(() => {
      this.form.reset();
      this.store.dispatch(NotesActions.unselectNoteAction());
    });
    this.subscriptions.add(modalEventSub);
  }

  /**
   * Проверка выбраной заметки
   */
  private checkSelectedNote() {
    const subToStoreSelectedNote = this.store.select(getSelectedNote).subscribe((note) => {
      this.selectedNote = note;
      this.isNoteCreation = !note;
      note && this.setFormValue(note);
    });
    this.subscriptions.add(subToStoreSelectedNote);
  }

  /**
   * Установка редактируемых значений выбраной заметки в поля формы
   * @param note Выбраная заметка
   */
  private setFormValue(note) {
    this.noteText.setValue(note.text);
    this.titleCheck.setValue(!!note.title);
    this.noteTitle.setValue(note.title);
  }

  /**
   * Установка и удаление валидаторов при динамическом добавлении инпутов
   */
  private setValidators(): void {
    const titleCheckValueSub = this.titleCheck.valueChanges.subscribe((value) => {
      if (value) {
        this.noteTitle.setValidators(Validators.required);
        this.noteTitle.updateValueAndValidity();
      } else {
        this.noteTitle.clearValidators();
        this.noteTitle.updateValueAndValidity();
        this.noteTitle.reset();
      }
    });
    this.subscriptions.add(titleCheckValueSub);
  }

  /**
   * Инициализация формы
   */
  private inintForm(): void {
    this.form = this.fb.group({
      text: ['', Validators.required],
      optionsChecks: this.fb.group({
        title: false,
      }),
      options: this.fb.group({
        title: '',
      }),
    });
  }

  /**
   * Инициализация переменных формы для отображения в шаблоне
   */
  private initFormVariables() {
    this.noteText = this.form.get('text') as FormControl;
    this.noteTitle = this.form.controls.options.get('title') as FormControl;
    this.titleCheck = this.form.controls.optionsChecks.get('title') as FormControl;
  }

  private afterLoadingEnd() {
    this.form.enable();
    this.modal && this.modal.close();
  }

  /**
   * Добавление заметки
   */
  createNote() {
    if (this.form.invalid) return;
    this.form.disable();
    const note = {
      text: this.noteText.value,
      title: this.titleCheck.value ? this.noteTitle.value : null,
    };
    this.store.dispatch(NotesActions.createNoteAction({ note }));
  }

  /**
   * Обнавление задачи
   */
  updateNote() {
    if (this.form.invalid) return;
    this.form.disable();
    const note = {
      ...this.selectedNote,
      text: this.noteText.value,
      title: this.titleCheck.value ? this.noteTitle.value : null,
    };
    this.store.dispatch(NotesActions.updateNoteAction({ note }));
  }
}
