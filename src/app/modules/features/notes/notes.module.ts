import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesLayoutComponent } from './layouts/notes-layout/notes-layout.component';


@NgModule({
  declarations: [NotesLayoutComponent],
  imports: [
    CommonModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
