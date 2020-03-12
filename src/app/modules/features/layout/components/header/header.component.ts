import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
// rxjs
import { Subscription } from 'rxjs';
import { trigger, transition, useAnimation } from '@angular/animations';
import { filter, tap } from 'rxjs/operators';
// services
import { AsideStateService } from './../../../../core/services/aside-state/aside-state.service';
import { AuthService } from 'src/app/modules/core/services/auth/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
// animations
import { enterAnimation, liveAnimation } from 'src/app/animations/header-btn.animation';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('btnAnimation', [
      transition(':enter', [useAnimation(enterAnimation)]),
      transition(':leave', [useAnimation(liveAnimation)])
    ])
  ]
})
export class HeaderComponent implements OnDestroy, OnInit, AfterViewInit {
  private subs: Subscription = new Subscription();
  isLoggedIn: boolean = false;
  isAuth: boolean = false;
  disableAnimation: boolean = true;
  asideState: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private asideService: AsideStateService,
    private smartModal: NgxSmartModalService
  ) {}

  ngOnInit() {
    this.changeLinnksVisibility();
    this.setIsLoggedIn();
    this.subToAsideStatus();
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
        .pipe(
          filter(event => event instanceof NavigationStart),
          tap((event: NavigationStart) => {
            this.checkAuthUrl(event.url);
          })
        )
        .subscribe(() => this.setIsLoggedIn())
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
      this.asideService.asideState$.subscribe(state => {
        this.asideState = state;
      })
    );
  }

  private setIsLoggedIn() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  changeAsideState() {
    this.asideService.setAsideState();
  }

  openLogoutModal() {
    const authModal = this.smartModal.getModal('authModal');
    authModal && authModal.open();
  }
}
