import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from './button/button.component';
import {InputComponent} from './input/input.component';
import {TextMaskModule} from "angular2-text-mask";


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TextMaskModule],
  declarations: [InputComponent, ButtonComponent],
  exports: [InputComponent, ButtonComponent, ReactiveFormsModule, FormsModule, TextMaskModule]
})
export class UiKitModule {

}
