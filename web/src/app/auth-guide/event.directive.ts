import {Directive, EventEmitter} from '@angular/core';

@Directive({
  selector: 'button',
  outputs: ['mySubmit'],
  host: {
    '(click)': 'onSubmit()',
    '(keyup.enter)': 'onSubmit()'
  }
})
export class EventDirective {
  mySubmit = new EventEmitter();

  onSubmit() {
    this.mySubmit.emit();
  }

}
