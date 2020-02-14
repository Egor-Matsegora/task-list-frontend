import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [AuthService, AuthGuard, { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor }]
})
export class CoreModule {}
