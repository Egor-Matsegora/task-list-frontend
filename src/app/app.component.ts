import { AuthService } from './modules/core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.authService.setToken(token);
    }
  }
}
