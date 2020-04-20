import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NotesStatistics } from '@app/interfaces/statistics.interface';

import * as moment from 'moment';
import { Chart } from 'chart.js';

import { chartHelper } from './../../helpers/chart.helper';

@Component({
  selector: 'tasks-stat',
  templateUrl: './tasks-stat.component.html',
  styleUrls: ['./tasks-stat.component.scss'],
})
export class TasksStatComponent implements OnInit, AfterViewInit {
  @Input() statistic;
  allTasksNumber: number = 0;
  allDoneTasksNumber: number = 0;
  todayTasksNumber: number = 0;
  type$: BehaviorSubject<string> = new BehaviorSubject('line');
  type: string = 'line';
  chart: Chart;

  @ViewChild('graph', { static: true }) graphRef: ElementRef;

  constructor() {}

  ngOnInit() {
    this.setTasksNumber();
  }

  ngAfterViewInit() {
    this.type$.subscribe((val) => {
      this.type = val;
      this.paintGraph(val);
    });
  }

  private setTasksNumber() {
    this.allTasksNumber = !!this.statistic.allTasksNumber ? this.statistic.allTasksNumber : 0;
    this.allDoneTasksNumber = !!this.statistic.allDoneTasksNumber ? this.statistic.allDoneTasksNumber : 0;
    const today = moment().format('DD.MM.YYYY');
    this.statistic.tasksStat.forEach((stat) => {
      this.todayTasksNumber = stat.date === today ? stat.tasksNumber : 0;
    });
  }

  paintGraph(type) {
    this.chart && this.chart.destroy();
    const config = {
      label: 'Заметки',
      color: '#22b9ff',
      type,
      labels: this.statistic.notesStat.map((item) => item.date),
      data: this.statistic.notesStat.map((item) => item.tasksNumber),
    };
    const ctx = this.graphRef.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, chartHelper(config));
  }
}
