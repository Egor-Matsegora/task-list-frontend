import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { notesReducer } from './reducers/notes.reducer';
import { LoadNotesEffects, CreateNotesEffects, UpdateNotesEffects, DeleteNotesEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('notes', notesReducer),
    EffectsModule.forFeature([LoadNotesEffects, CreateNotesEffects, UpdateNotesEffects, DeleteNotesEffects]),
  ],
})
export class NotesStroreModule {}
