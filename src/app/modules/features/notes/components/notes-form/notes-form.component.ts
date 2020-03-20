import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Note } from '@interfaces/note.interface';
import { enterAnimation, leaveAnimation } from '@app/animations/dynamic-control.animation';
import { Subscription } from 'rxjs';
import { NotesService } from '../../services/notes/notes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss'],
  animations: [
    trigger('controlAnimation', [
      transition(':enter', [useAnimation(enterAnimation)]),
      transition(':leave', [useAnimation(leaveAnimation)])
    ])
  ]
})
export class NotesFormComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  form: FormGroup;
  noteText: FormControl;
  noteTitle: FormControl;
  titleCheck: FormControl;
  modalData: Note;
  modal: NgxSmartModalComponent;
  constructor(
    private fb: FormBuilder,
    private smartModal: NgxSmartModalService,
    private noteService: NotesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initModal();
    this.inintForm();
    this.initFormVariables();
    this.setValidators();
    this.subToCloseModalEvent();
    this.checkModalData();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
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
    this.subscriptions.add(
      this.modal.onAnyCloseEvent.subscribe(() => {
        this.form.reset();
        this.modal.removeData();
      })
    );
  }

  /**
   * Проверка данных приходящих в модалку
   * Если данные приходят, значит заметка редактируется
   * Если их нет, значит заметка создается
   */
  private checkModalData() {
    if (!this.modal) return;
    this.subscriptions.add(
      this.modal.onOpen.subscribe(() => {
        this.modalData = this.modal.getData();
        if (this.modalData) {
          this.noteText.setValue(this.modalData.text);
          this.titleCheck.setValue(!!this.modalData.title);
          this.noteTitle.setValue(this.modalData.title);
        }
      })
    );
  }

  /**
   * Установка и удаление валидаторов при динамическом добавлении инпутов
   */
  private setValidators(): void {
    this.titleCheck.valueChanges.subscribe(value => {
      if (value) {
        this.noteTitle.setValidators(Validators.required);
        this.noteTitle.updateValueAndValidity();
      } else {
        this.noteTitle.clearValidators();
        this.noteTitle.updateValueAndValidity();
        this.noteTitle.reset();
      }
    });
  }

  /**
   * Инициализация формы
   */
  private inintForm(): void {
    this.form = this.fb.group({
      text: ['', Validators.required],
      optionsChecks: this.fb.group({
        title: false
      }),
      options: this.fb.group({
        title: ''
      })
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

  /**
   * Добавление заметки
   */
  createNote() {
    if (this.form.invalid) return;
    this.form.disable();
    const formValue = {
      text: this.noteText.value,
      title: this.titleCheck.value ? this.noteTitle.value : null
    };
    this.subscriptions.add(
      this.noteService.createNote(formValue).subscribe(
        note => {
          this.form.enable();
          this.modal.close();
          this.noteService.createNoteAction(note);
          this.toastr.success('Заметка успешно создана');
        },
        error => {
          this.toastr.error('Ошибка в создании заметки');
          this.form.enable();
        }
      )
    );
  }

  /**
   * Обнавление задачи
   */
  updateNote() {
    if (this.form.invalid) return;
    this.form.disable();
    this.modalData.text = this.noteText.value;
    this.modalData.title = this.titleCheck.value ? this.noteTitle.value : null;
    this.subscriptions.add(
      this.noteService.updateNote(this.modalData).subscribe(
        note => {
          this.form.enable();
          this.modal.close();
          this.noteService.updateNoteAction(note);
          this.toastr.success('Задача успешно обновлена');
        },
        error => {
          this.toastr.error('Ошибка в редактировании задачи');
          this.form.enable();
        }
      )
    );
  }
}
