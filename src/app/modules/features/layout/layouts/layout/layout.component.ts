import { Component, AfterViewInit } from '@angular/core';
import { trigger, transition, useAnimation, query, group, style } from '@angular/animations';
import { enterPage, livePage } from 'src/app/animations/routing.animation';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('* => *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
          query(':enter', [useAnimation(enterPage)], { optional: true }),
          query(':leave', [useAnimation(livePage)], { optional: true }),
        ]),
      ]),
    ]),
  ],
})
export class LayoutComponent implements AfterViewInit {
  isLoggedIn: boolean = false;
  disableAnimation: boolean = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.disableAnimation = false;
    }, 0);
  }

  routeState(outlet: any) {
    if (outlet.isActivated) {
      return outlet.activatedRoute.data.getValue().state;
    }
  }
}
