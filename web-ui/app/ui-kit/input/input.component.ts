import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {
  inputForm: FormGroup;

  @Output() appInputChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      'input': new FormControl('', [
        Validators.required
      ])
    });
  }

  onChanged() {
    const input = this.inputForm.get('input');
    this.appInputChange.emit(input && input.value || '');
  }

}