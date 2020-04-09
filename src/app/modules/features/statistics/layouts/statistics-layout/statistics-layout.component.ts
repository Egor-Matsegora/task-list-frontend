import { ToastrService } from 'ngx-toastr';
import { StatisticsService } from './../../services/statistics.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Statistics } from '@interfaces/statistics.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'statistics-layout',
  templateUrl: './statistics-layout.component.html',
  styleUrls: ['./statistics-layout.component.scss'],
})
export class StatisticsLayoutComponent implements OnInit, OnDestroy {
  statistics: Statistics;
  isLoading: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private statisticsService: StatisticsService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getStatistics();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }

  private getStatistics() {
    this.isLoading = true;
    this.subscriptions.add(
      this.statisticsService.getStatistics().subscribe(
        (response) => {
          this.statistics = response;
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error('Ошибка загрузки статистики');
          this.isLoading = false;
        }
      )
    );
  }
}
