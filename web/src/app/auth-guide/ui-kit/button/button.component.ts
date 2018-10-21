import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() value = '';
  @Input() inputFormGroup = new FormGroup({});

  @HostBinding('class.active')
  get isValid() {
    return this.inputFormGroup.valid;
  }
}
