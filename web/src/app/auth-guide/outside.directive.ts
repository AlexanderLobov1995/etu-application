import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[outside]'
})
export class OutsideDirective {
  constructor(el: ElementRef) {
    window.addEventListener('click', (e) => {
      console.log(e.target);
      console.log(el.nativeElement.contains(e.target));
    });
  }
}
