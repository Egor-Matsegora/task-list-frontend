import { AuthService } from '@core/services/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/features/layout/layout.module';
import { CoreModule } from './modules/core/core.module';

export function checkTokenFactory(service: AuthService) {
  service.checkToken();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
