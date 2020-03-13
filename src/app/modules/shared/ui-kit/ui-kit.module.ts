import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// components
import { LoaderComponent } from './components/loader/loader.component';
import { UiButtonComponent } from './components/ui-button/ui-button.component';

@NgModule({
  declarations: [UiButtonComponent, LoaderComponent],
  imports: [CommonModule],
  exports: [UiButtonComponent, LoaderComponent]
})
export class UiKitModule {}
