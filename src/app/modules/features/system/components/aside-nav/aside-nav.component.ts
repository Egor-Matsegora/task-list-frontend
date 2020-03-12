import { AsideStateService } from './../../../../core/services/aside-state/aside-state.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss']
})
export class AsideNavComponent implements OnInit {
  asideState: boolean;
  subscriptions: Subscription = new Subscription();

  constructor(private asideService: AsideStateService) {}

  ngOnInit() {
    this.subToAsideState();
  }

  private subToAsideState() {
    this.subscriptions.add(
      this.asideService.asideState$.subscribe(state => {
        this.asideState = state;
      })
    );
  }
}
