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
  it('should be created and set asideState to localStorage', () => {
    const service: AsideStateService = asideStateService;
    expect(service).toBeTruthy('do not created');
    expect(localStorage.getItem('asideState')).toBeTruthy('dont sand asideState into localStorage');
  });

  // get asideStorageState(): boolean
  it('should check aside state in localStorage and return boolean', () => {
    const result = asideStateService.asideStorageState;
    const expectation = !!Number(localStorage.getItem('asideState'));
    expect(result).toBe(expectation, 'do not returns boolean value');
  });

  // setDefaultState()
  it('should set aside state from asideState behavior subject to localStorage', () => {
    spyOn(localStorage, 'setItem');

    asideStateService.setDefaultState();
    asideStateService.asideState$.subscribe(state => {
      const expectation = state ? '1' : '0';
      expect(expectation).toBe(localStorage.getItem('asideState'));
    });
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  // removeAsideStorageState()
  it('shoud check and delete localstorage asideState key', () => {
    spyOn(localStorage, 'getItem').and.returnValues('1');
    spyOn(localStorage, 'removeItem');

    asideStateService.removeAsideStorageState();

    const expectation = localStorage.getItem('asideState');

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalledWith('asideState');
    expect(localStorage.removeItem).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith('asideState');
    expect(expectation).toBeFalsy('dont remove asideState key from storage');
  });

  // ngOnDestroy
  it('shoud unsubscribe from subscriptions and remove aside state from storage', () => {
    asideStateService.ngOnDestroy();

    const expectation = localStorage.getItem('asideState');

    expect(expectation).toBeFalsy('dont remove asideState key from storage');
  });
});
