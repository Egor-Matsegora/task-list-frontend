import { mergeMap } from 'rxjs/operators';
import { getAuthLoginStatus } from './../../../features/auth/store/state/auth.state';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SystemGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(getAuthLoginStatus),
      mergeMap((status) => {
        status && this.router.navigate(['system']);
        return of(!status);
      })
    );
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(next, state);
  }
}
