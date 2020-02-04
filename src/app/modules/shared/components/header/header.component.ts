import { enterAnimation, liveAnimation } from './../../../../animations/header-btn.animation';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

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
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor() {}

  ngOnInit() {}
}
