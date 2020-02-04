import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [HeaderComponent, LogoComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [BrowserAnimationsModule, HeaderComponent, LogoComponent]
})
export class SharedModule {}
