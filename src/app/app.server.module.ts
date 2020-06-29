import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { ServerLocalStorageService } from '@core/services/server-local-storage/server-local-storage.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [AppModule, ServerModule],
  providers: [{ provide: LocalStorageService, useClass: ServerLocalStorageService }],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
