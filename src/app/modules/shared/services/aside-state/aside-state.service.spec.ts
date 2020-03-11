import { TestBed } from '@angular/core/testing';

import { AsideStateService } from './aside-state.service';

describe('AsideStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsideStateService = TestBed.get(AsideStateService);
    expect(service).toBeTruthy();
  });
});
