import { Statistics } from '@interfaces/statistics.interface';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { StatisticsService } from './../../services/statistics.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StatisticsModule } from './../../statistics.module';
import { SharedModule } from '@shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsLayoutComponent } from './statistics-layout.component';
import { DebugElement } from '@angular/core';
import { delay } from 'rxjs/operators';

describe('StatisticsLayoutComponent', () => {
  let component: StatisticsLayoutComponent;
  let fixture: ComponentFixture<StatisticsLayoutComponent>;
  let element: DebugElement;
  let toastr: any;
  let statisticsService: any;

  beforeEach(async(() => {
    const statisticsServiceSpy = jasmine.createSpyObj('StatisticsService', ['getStatistics']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      imports: [SharedModule, StatisticsModule, HttpClientTestingModule],
      providers: [
        { provide: StatisticsService, useValue: statisticsServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(StatisticsLayoutComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        toastr = TestBed.get(ToastrService);
        statisticsService = TestBed.get(StatisticsService);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy('component not initialized');
  });

  it('should display a loader when statistics are loading', () => {
    statisticsService.getStatistics.and.returnValue(of({}).pipe(delay(5000)));
    fixture.detectChanges();
    const loader = element.query(By.css('.statistics__loader'));
    expect(loader).toBeTruthy();
  });

  it('should call a toaster when statistics loading error', () => {
    statisticsService.getStatistics.and.returnValue(throwError('error'));
    fixture.detectChanges();
    expect(toastr.error).toHaveBeenCalledTimes(1);
    expect(toastr.error).toHaveBeenCalledWith('Ошибка загрузки статистики');
  });

  it('should display components when receiving statistics', () => {
    const testStat: Statistics = {
      notes: {
        notesStat: [
          { date: '30.03.2020', notesNumber: 2 },
          { date: '08.04.2020', notesNumber: 1 },
        ],
        allNotesNumber: 3,
      },
      tasks: {
        tasksStat: [
          {
            date: '20.03.2020',
            doneTasksNumber: 0,
            tasksNumber: 4,
          },
          {
            date: '26.03.2020',
            doneTasksNumber: 0,
            tasksNumber: 5,
          },
        ],
        allTasksNumber: 0,
        allDoneTasksNumber: 9,
      },
    };
    statisticsService.getStatistics.and.returnValue(of(testStat));
    fixture.detectChanges();
    const notesStatElement = element.query(By.css('notes-stat'));
    const tasksStatElement = element.query(By.css('tasks-stat'));
    expect(notesStatElement).toBeTruthy('notes stat component are not displayed');
    expect(tasksStatElement).toBeTruthy('tasks stat component are not displayed');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
