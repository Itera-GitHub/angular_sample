import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[carouselItem]'
})
export class CarouselDirective {

  constructor( public tpl : TemplateRef<any> ) {
  }

}