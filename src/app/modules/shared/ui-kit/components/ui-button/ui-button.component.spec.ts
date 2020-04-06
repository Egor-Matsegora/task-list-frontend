import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonComponent } from './ui-button.component';
import { DebugElement, Renderer2, Type } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('UiButtonComponent', () => {
  let component: UiButtonComponent;
  let fixture: ComponentFixture<UiButtonComponent>;
  let element: DebugElement;
  let renderer: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiButtonComponent],
      providers: [Renderer2]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UiButtonComponent);
        renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
        component = fixture.componentInstance;
        element = fixture.debugElement;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be disabled when inout property isDisabled in true', () => {
    component.isDisabled = true;
    fixture.detectChanges();
    const buttonDisabled = element.query(By.css('button')).nativeElement.disabled;
    expect(buttonDisabled).toBeTruthy();
  });

  it('should have type equal to input buttonType property', () => {
    component.buttonType = 'reset';
    fixture.detectChanges();
    const buttonType = element.query(By.css('button')).nativeElement.type;
    expect(buttonType).toBeTruthy('has no type');
    expect(buttonType).toEqual('reset', 'wrong type');
  });

  it('should have class equal to classList property when it string', () => {
    component.classList = 'button_submit';
    spyOn(renderer, 'addClass').and.callThrough();
    component.ngOnChanges();
    fixture.detectChanges();
    const button = element.query(By.css('button')).nativeElement;
    expect(renderer.addClass).toHaveBeenCalled();
    expect(renderer.addClass).toHaveBeenCalledWith(button, 'button_submit');
  });

  it('should have class equal to classList property when it array of string', () => {
    component.classList = ['button_submit', 'button_block'];
    spyOn(renderer, 'addClass').and.callThrough();
    component.ngOnChanges();
    fixture.detectChanges();
    const button = element.query(By.css('button')).nativeElement;
    expect(renderer.addClass).toHaveBeenCalledTimes(2);
    expect(renderer.addClass).toHaveBeenCalledWith(button, 'button_submit');
    expect(renderer.addClass).toHaveBeenCalledWith(button, 'button_block');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
