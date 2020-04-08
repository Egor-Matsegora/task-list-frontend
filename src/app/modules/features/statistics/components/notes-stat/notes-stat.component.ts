import { Component, OnInit, Input } from '@angular/core';
import { NotesStatistics } from '@app/interfaces/statistics.interface';

@Component({
  selector: 'notes-stat',
  templateUrl: './notes-stat.component.html',
  styleUrls: ['./notes-stat.component.scss'],
})
export class NotesStatComponent implements OnInit {
  @Input() statistic: NotesStatistics;

  constructor() {}

  ngOnInit() {
    console.log(this.statistic);
  }
}
