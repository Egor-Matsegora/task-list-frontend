import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// components
import { UiButtonComponent } from './components/ui-button/ui-button.component';

@NgModule({
  declarations: [UiButtonComponent],
  imports: [CommonModule],
  exports: [UiButtonComponent]
})
export class UiKitModule {}
