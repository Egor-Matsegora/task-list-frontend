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
    this.subToCloseModalEvent();
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
   * Подписка на закрытие модалки для сброса формы
   */
  private subToCloseModalEvent() {
    this.subscriptions.add(this.modal.onAnyCloseEvent.subscribe(() => this.form.reset()));
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

  createNote() {
    if (this.form.invalid) return;
    this.form.disable();
    const formValue = {
      text: this.noteText.value,
      title: this.titleCheck.value ? this.noteTitle.value : null
    };
    console.log(formValue);
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

  updateNote() {}
}
