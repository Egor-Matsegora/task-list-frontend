import { Task } from '@interfaces/task.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  // items: Task[];
  items = [1, 2, 3, 4];

  constructor() {}

  ngOnInit() {}
}
