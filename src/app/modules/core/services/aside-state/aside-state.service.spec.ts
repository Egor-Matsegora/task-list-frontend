import { TestBed } from '@angular/core/testing';

import { AsideStateService } from './aside-state.service';

let asideStateService: AsideStateService;

describe('AsideStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsideStateService]
    });
    asideStateService = TestBed.get(AsideStateService);
  });

  // constructor
  it('should be created', () => {
    const service: AsideStateService = asideStateService;
    expect(service).toBeTruthy();
  });

  // get asideStorageState(): boolean
  it('should check aside state in localStorage and return boolean', () => {
    const result = asideStateService.asideStorageState;
    const expectation = !!Number(localStorage.getItem('asideState'));
    expect(result).toBe(expectation);
  });

  // removeAsideStorageState()
  it('shoud check and delete localstorage asideState key', () => {
    spyOn(localStorage, 'getItem').and.returnValues('1');
    spyOn(localStorage, 'removeItem');

    asideStateService.removeAsideStorageState();

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalledWith('asideState');
    expect(localStorage.removeItem).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith('asideState');
  });

  // ngOnDestroy
  it('shoud unsubscribe from subscriptions and remove aside state from storage', () => {
    asideStateService.ngOnDestroy();

    const expectation = localStorage.getItem('asideState');

    expect(expectation).toBeFalsy();
  });
});
