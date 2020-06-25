import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

xdescribe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserService = TestBed.inject<any>(UserService);
    expect(service).toBeTruthy();
  });
});
