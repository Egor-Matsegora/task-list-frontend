import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../../../../../interfaces/task.interface';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  // @Input() task: Task;
  @Input() task: number;

  constructor() {}

  ngOnInit() {}
}
