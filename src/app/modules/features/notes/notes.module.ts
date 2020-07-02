import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules
import { NotesRoutingModule } from './notes-routing.module';
import { SharedModule } from '@shared/shared.module';
// components
import { NotesLayoutComponent } from './layouts/notes-layout/notes-layout.component';
import { NotesFormComponent } from './components/notes-form/notes-form.component';
import { NoteComponent } from './components/note/note.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NotesHeaderComponent } from './components/notes-header/notes-header.component';
// services
import { NotesService } from './services/notes/notes.service';
import { NotesStroreModule } from './store/notes-strore.module';

@NgModule({
  declarations: [NotesLayoutComponent, NotesFormComponent, NoteComponent, NotesListComponent, NotesHeaderComponent],
  imports: [CommonModule, NotesRoutingModule, SharedModule, NotesStroreModule],
  providers: [NotesService],
})
export class NotesModule {}
