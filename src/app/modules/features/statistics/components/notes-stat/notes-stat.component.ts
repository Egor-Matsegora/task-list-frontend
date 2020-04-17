import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NotesStatistics } from '@app/interfaces/statistics.interface';

import * as moment from 'moment';
import { Chart } from 'chart.js';

import { chartHelper } from './../../helpers/chart.helper';

@Component({
  selector: 'notes-stat',
  templateUrl: './notes-stat.component.html',
  styleUrls: ['./notes-stat.component.scss'],
})
export class NotesStatComponent implements OnInit, AfterViewInit {
  @Input() statistic: NotesStatistics;
  allNotesNumber: number = 0;
  todayNotesNumber: number = 0;

  @ViewChild('graph', { static: true }) graphRef: ElementRef;

  constructor() {}

  ngOnInit() {
    this.setNotesNumber();
  }

  ngAfterViewInit() {
    this.paintGraph();
  }

  private setNotesNumber() {
    this.allNotesNumber = !!this.statistic.allNotesNumber ? this.statistic.allNotesNumber : 0;
    const today = moment().format('DD.MM.YYYY');
    this.statistic.notesStat.forEach((stat) => {
      this.todayNotesNumber = stat.date === today ? stat.notesNumber : 0;
    });
  }

  paintGraph() {
    const config = {
      label: 'Заметки',
      color: '#22b9ff',
      labels: this.statistic.notesStat.map((item) => item.date),
      data: this.statistic.notesStat.map((item) => item.notesNumber),
    };
    const ctx = this.graphRef.nativeElement.getContext('2d');

    new Chart(ctx, chartHelper(config));
  }
}
