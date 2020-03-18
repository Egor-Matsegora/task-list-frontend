import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// components
import { LogoComponent } from './components/logo/logo.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UiButtonComponent } from './components/ui-button/ui-button.component';

@NgModule({
  declarations: [UiButtonComponent, LoaderComponent, LogoComponent],
  imports: [CommonModule],
  exports: [UiButtonComponent, LoaderComponent, LogoComponent]
})
export class UiKitModule {}
