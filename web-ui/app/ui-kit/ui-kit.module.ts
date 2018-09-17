import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MobxAngularModule} from "mobx-angular";
import {InputComponent} from "./input/input.component";

@NgModule({
  imports: [CommonModule, MobxAngularModule, FormsModule, ReactiveFormsModule],
  declarations: [ InputComponent],
  exports: [InputComponent ]
})
export class UiKitModule {

}