import { mergeMap } from 'rxjs/operators';
import { loadStatisticsAction, clearStatisticsErrorsAction } from './../../store/actions/statistics.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, empty } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { getStatistics, getStatisticsLoading, getStatisticsError } from './../../store/state/statistics.state';
import { Statistics } from '@interfaces/statistics.interface';

@Component({
  selector: 'statistics-layout',
  templateUrl: './statistics-layout.component.html',
  styleUrls: ['./statistics-layout.component.scss'],
})
export class StatisticsLayoutComponent implements OnInit, OnDestroy {
  statistics$: Observable<Statistics>;
  isLoading$: Observable<boolean>;
  errorSub: Subscription;

  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit() {
    this.store.dispatch(loadStatisticsAction());
    this.getStatisticsValues();
  }

  ngOnDestroy() {
    this.errorSub && this.errorSub.unsubscribe();
  }

  private getStatisticsValues() {
    this.statistics$ = this.store.select(getStatistics);
    this.isLoading$ = this.store.select(getStatisticsLoading);
    this.errorSub = this.store
      .pipe(
        select(getStatisticsError),
        mergeMap((error) => {
          if (error) return this.toastr.error(error).onHidden;
          return empty();
        })
      )
      .subscribe(() => this.store.dispatch(clearStatisticsErrorsAction()));
  }
}
