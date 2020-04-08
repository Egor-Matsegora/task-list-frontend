import { Component, OnInit, Input } from '@angular/core';
import { TasksStatistics } from '@app/interfaces/statistics.interface';

@Component({
  selector: 'tasks-stat',
  templateUrl: './tasks-stat.component.html',
  styleUrls: ['./tasks-stat.component.scss'],
})
export class TasksStatComponent implements OnInit {
  @Input() statistic: TasksStatistics;

  constructor() {}

  ngOnInit() {}
}
