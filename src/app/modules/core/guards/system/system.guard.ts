import { StorageService } from '@shared/services/storage.service';
import { mergeMap } from 'rxjs/operators';
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
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.storageService.get('token')) {
      return of(true);
    } else {
      this.router.navigate(['system']);
      return of(false);
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(next, state);
  }
}
