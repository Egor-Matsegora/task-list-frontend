import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksEffects, TasksReducers } from './';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tasks', TasksReducers.tasksReducer),
    EffectsModule.forFeature([TasksEffects.TasksEffects]),
  ],
})
export class TasksStoreModule {}
