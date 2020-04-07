import { StatisticsService } from './../../services/statistics.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'statistics-layout',
  templateUrl: './statistics-layout.component.html',
  styleUrls: ['./statistics-layout.component.scss'],
})
export class StatisticsLayoutComponent implements OnInit {
  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    this.statisticsService.getStatistics().subscribe((stat) => console.log(stat));
  }
}
