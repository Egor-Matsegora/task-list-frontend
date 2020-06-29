import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// local
import { AuthService } from '@core/services/auth/auth.service';
import { AsideStateService } from '@core/services/aside-state/aside-state.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AuthService,
    AuthGuard,
    AsideStateService,
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor },
  ],
})
export class CoreModule {}
