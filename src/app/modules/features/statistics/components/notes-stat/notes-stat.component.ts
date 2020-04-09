import { Component, OnInit, Input } from '@angular/core';
import { NotesStatistics } from '@app/interfaces/statistics.interface';

import * as moment from 'moment';

@Component({
  selector: 'notes-stat',
  templateUrl: './notes-stat.component.html',
  styleUrls: ['./notes-stat.component.scss'],
})
export class NotesStatComponent implements OnInit {
  @Input() statistic: NotesStatistics;
  allNotesNumber: number = 0;
  todayNotesNumber: number = 0;

  constructor() {}

  ngOnInit() {
    this.setNotesNumber();
  }

  private setNotesNumber() {
    this.allNotesNumber = !!this.statistic.allNotesNumber ? this.statistic.allNotesNumber : 0;
    const today = moment().format('DD.MM.YYYY');
    this.statistic.notesStat.forEach((stat) => {
      this.todayNotesNumber = stat.date === today ? stat.notesNumber : 0;
    });
  }
}
