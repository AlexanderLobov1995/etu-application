import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask";
import {MobxAngularModule} from "mobx-angular";
import {DatepickerComponent} from "./datepicker/datepicker.component";
import {InputComponent} from "./input/input.component";

@NgModule({
  imports: [CommonModule, MobxAngularModule, FormsModule, ReactiveFormsModule, TextMaskModule],
  declarations: [ InputComponent, DatepickerComponent],
  exports: [InputComponent, DatepickerComponent ]
})
export class UiKitModule {

}