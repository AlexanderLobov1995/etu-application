import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from './button/button.component';
import {InputComponent} from './input/input.component';


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [InputComponent, ButtonComponent],
  exports: [InputComponent, ButtonComponent, ReactiveFormsModule, FormsModule]
})
export class UiKitModule {

}
