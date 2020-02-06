import { Directive, ElementRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { tap, debounceTime, map, filter } from 'rxjs/operators';

/**
 * Директива изменяет стили путем добавления или удаления классов
 * Классы прописаны в файле src/scss/parts/_controls.scss
 * Без подключения данного файла дирректива не будет работать корректно
 */
@Directive({
  selector: '[mutatedPasswordInput]'
})
export class MutatedPasswordInputDirective implements AfterViewInit, OnDestroy {
  element: HTMLInputElement = this.elementRef.nativeElement;
  button: HTMLDivElement = this.renderer.createElement('div');
  private inputSub: Subscription;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.createBtn();
    this.changeType();
  }

  ngOnDestroy() {
    if (this.inputSub) {
      this.inputSub.unsubscribe();
    }
  }

  /**
   * Добавляет кнопку переключения для типа инпута
   * Изменяет стили инпута путем добавления класса
   */
  private createBtn(): void {
    const parent = this.element.parentNode;
    this.renderer.addClass(this.element, 'control__input_mutable');
    this.renderer.addClass(this.button, 'control__mutable-btn');
    if (this.element.getAttribute('type') === 'text') {
      this.renderer.addClass(this.button, 'control__mutable-btn_visible');
    }
    this.renderer.insertBefore(parent, this.button, this.element);
  }

  /**
   * Изменяет тип инпута, если в него что-то введено
   */
  private changeType(): void {
    this.renderer.listen(this.button, 'click', () => {
      if (this.element.value) {
        this.button.classList.toggle('control__mutable-btn_visible');
        const type = this.element.getAttribute('type');
        if (type === 'password') {
          this.renderer.setAttribute(this.element, 'type', 'text');
        } else {
          this.renderer.setAttribute(this.element, 'type', 'password');
        }
      }
    });
  }
}
