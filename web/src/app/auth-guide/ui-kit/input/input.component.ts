import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  get labelId() {
    return `${this.labelName}Id`;
  }

}
