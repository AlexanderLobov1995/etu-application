import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MobxAngularModule} from "mobx-angular";
import {EventDirective} from "../event.directive";
import {OutsideDirective} from "../outside.directive";
import {SvgIconComponent} from "./svg-icon/svg-icon.component";

@NgModule({
  imports: [CommonModule, MobxAngularModule, FormsModule,],
  declarations: [SvgIconComponent, EventDirective, OutsideDirective],
  exports: [SvgIconComponent, CommonModule, EventDirective, MobxAngularModule, FormsModule, OutsideDirective]
})
export class SharedModule {
}
