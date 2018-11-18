import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {animate, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.styl'],
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({transform: 'translateY(-100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
          ]
        ),
        transition(
          ':leave', [
            style({transform: 'translateY(0)', 'opacity': 1}),
            animate('500ms', style({transform: 'translateY(-100%)', opacity: 0}))
          ]
        )]
    )]
})
export class InputComponent implements OnInit {

  @Input() appFormControl: FormControl = new FormControl();

  @Input() labelName = 'name';
  @Input() placeholder = '';
  @Input() type = '';

  @Output() appInputChange = new EventEmitter<string>();

  @HostBinding('class.active')
  isActive = false;


  @HostBinding('class.incorrect')
  get errors() {
    return this.appFormControl.errors && !this.appFormControl.pristine;
  }

  @HostBinding('class.correct')
  get correct() {
    return !this.appFormControl.errors && !this.appFormControl.pristine;
  }

  ngOnInit(): void {
    console.log(this.appFormControl);
  }

  onFocus() {
    this.isActive = true;
  }

  onBlur() {
    this.isActive = false;
  }

  get errorMessage() {
    return this.appFormControl.dirty&& this.appFormControl.getError('error message');
  }

  get labelId() {
    return `${this.labelName}Id`;
  }

}
