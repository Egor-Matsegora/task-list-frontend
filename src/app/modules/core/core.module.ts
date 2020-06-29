import { AsideStateService } from './services/aside-state/aside-state.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreStoreModule } from './store/core-store.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, CoreStoreModule],
  providers: [
    AuthService,
    AuthGuard,
    AsideStateService,
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor }
  ]
})
export class CoreModule {}
