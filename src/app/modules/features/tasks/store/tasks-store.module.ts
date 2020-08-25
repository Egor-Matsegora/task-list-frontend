import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tasksReducer } from './reducers';
import { LoadTasksEffects, CreateTasksEffects, UpdateTasksEffects, DeleteTasksEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([LoadTasksEffects, CreateTasksEffects, UpdateTasksEffects, DeleteTasksEffects]),
  ],
})
export class TasksStoreModule {}
