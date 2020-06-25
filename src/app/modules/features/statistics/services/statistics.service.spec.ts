import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { StatisticsService } from './statistics.service';
import { handleHttpError } from '@helpers/handle-http-error';

let httpTestingController: HttpTestingController;
let service: StatisticsService;

describe('StatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatisticsService],
    });
    httpTestingController = TestBed.inject<any>(HttpTestingController);
    service = TestBed.inject<any>(StatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get statistics', () => {
    const testStat = {
      notes: {
        notesStat: [
          { date: '30.03.2020', notesNumber: 2 },
          { date: '08.04.2020', notesNumber: 1 },
        ],
        allNotesNumber: 3,
      },
      tests: {},
    };

    service.getStatistics().subscribe((response) => {
      const notesStat = response.notes;
      expect(response).toBeTruthy('no response');
      expect(notesStat.allNotesNumber).toBe(3, 'unexpected number of all notes');
    });

    const request = httpTestingController.expectOne('/api/statistics/');
    expect(request.request.method).toEqual('GET');
    request.flush(testStat);
  });

  it('should throw error when server returnes error', () => {
    let handleError = jasmine.createSpy('handleError', handleHttpError);
    spyOn(console, 'error');
    service
      .getStatistics()
      .pipe(catchError((error) => handleError(error)))
      .subscribe(
        () => fail('it should be failed'),
        (error: HttpErrorResponse) => {
          expect(handleHttpError).toHaveBeenCalledWith(error);
          expect(console.error).toHaveBeenCalled();
          expect(error.status).toBe(500);
        }
      );

    const request = httpTestingController.expectOne('/api/statistics/');
    expect(request.request.method).toEqual('GET');
    request.flush('Get statistics whas failed', { status: 500, statusText: 'Internal Server Error' });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
