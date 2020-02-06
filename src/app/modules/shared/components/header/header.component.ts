import { enterAnimation, liveAnimation } from './../../../../animations/header-btn.animation';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

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
export class HeaderComponent implements OnDestroy, OnInit {
  private routerEventsSub: Subscription;
  isLoggedIn: boolean = false;
  isAuth: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.changeLinnksVisibility();
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
      .subscribe();
  }
}
