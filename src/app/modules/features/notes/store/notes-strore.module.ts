import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { notesReducer } from './reducers/notes.reducer';
import { NotesEffects } from './effects/notes.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('notes', notesReducer), EffectsModule.forFeature([NotesEffects])],
})
export class NotesStroreModule {}
