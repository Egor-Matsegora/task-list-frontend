import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
// rxjs
import { Subscription, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
// services
import { AsideStateService } from '@core/services/aside-state/aside-state.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
// animations
import { getAuthStatus } from '@features/auth/store/state/auth.state';
import { enterAnimation, liveAnimation } from './header-btn.animation';
import { AuthActions } from '@app/modules/features/auth/store/actions';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('btnAnimation', [
      transition(':enter', [useAnimation(enterAnimation)]),
      transition(':leave', [useAnimation(liveAnimation)]),
    ]),
  ],
})
export class HeaderComponent implements OnDestroy, OnInit, AfterViewInit {
  private subs: Subscription = new Subscription();
  isLoggedIn$: Observable<boolean>;
  isAuth: boolean = false;
  disableAnimation: boolean = true;
  asideState: boolean;

  constructor(
    private router: Router,
    private store: Store,
    private asideService: AsideStateService,
    private smartModal: NgxSmartModalService
  ) {}

  ngOnInit() {
    this.changeLinnksVisibility();
    this.setIsLoggedIn();
    this.subToAsideStatus();
    this.store.dispatch(AuthActions.getAuthStatusAction());
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.disableAnimation = false;
    }, 0);
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  private changeLinnksVisibility(): void {
    const url = this.router.url;

    this.checkAuthUrl(url);
    this.subs.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationStart))
        .subscribe((event: NavigationStart) => {
          this.checkAuthUrl(event.url);
        })
    );
  }

  private checkAuthUrl(url) {
    if (url.startsWith('/auth')) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  private subToAsideStatus() {
    this.subs.add(
      this.asideService.asideState$.subscribe((state) => {
        this.asideState = state;
      })
    );
  }

  private setIsLoggedIn() {
    this.isLoggedIn$ = this.store.select(getAuthStatus);
  }

  changeAsideState() {
    this.asideService.setAsideState();
  }

  openLogoutModal() {
    const authModal = this.smartModal.getModal('authModal');
    authModal && authModal.open();
  }
}
