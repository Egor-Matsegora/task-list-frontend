import { Component, OnChanges, Input, ElementRef, Renderer2, ViewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiButtonComponent implements OnChanges {
  @Input() buttonType?: string;
  @Input() classList: string | string[];
  @Input() isDisabled?: boolean;
  @ViewChild('button', { static: true }) button: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnChanges() {
    this.setAttributes();
  }

  private setAttributes() {
    const element = this.button.nativeElement;

    if (typeof this.classList === 'string') {
      this.renderer.addClass(element, this.classList);
    } else {
      for (const item of this.classList) {
        this.renderer.addClass(element, item);
      }
    }

    if (this.buttonType) this.renderer.setAttribute(element, 'type', this.buttonType);

    if (this.isDisabled === true || this.isDisabled === false) {
      this.renderer.setProperty(element, 'disabled', this.isDisabled);
    }
  }
}
