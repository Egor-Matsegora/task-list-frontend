import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
// rxjs
import { Subscription } from 'rxjs';
import { trigger, transition, useAnimation } from '@angular/animations';
import { filter, tap } from 'rxjs/operators';
// services
import { AuthService } from 'src/app/modules/core/services/auth/auth.service';
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
  private routerEventsSub: Subscription;
  isLoggedIn: boolean = false;
  isAuth: boolean = false;
  disableAnimation: boolean = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.changeLinnksVisibility();
    this.setIsLoggedIn();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.disableAnimation = false;
    }, 0);
  }

  ngOnDestroy() {
    if (this.routerEventsSub) {
      this.routerEventsSub.unsubscribe();
    }
  }

  private changeLinnksVisibility(): void {
    const url = this.router.url;

    if (url.startsWith('/auth')) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
    this.routerEventsSub = this.router.events
      .pipe(
        filter(e => e instanceof NavigationStart),
        tap((e: NavigationStart) => {
          if (e.url.startsWith('/auth')) {
            this.isAuth = true;
          } else {
            this.isAuth = false;
          }
        })
      )
      .subscribe(() => this.setIsLoggedIn());
  }

  private setIsLoggedIn() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
