import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {MobxAngularModule} from "mobx-angular";
import {EventDirective} from "../event.directive";
import {SvgIconComponent} from "./svg-icon/svg-icon.component";

@NgModule({
  imports: [CommonModule, MobxAngularModule],
  declarations: [SvgIconComponent, EventDirective],
  exports: [SvgIconComponent, CommonModule, EventDirective, MobxAngularModule]
})
export class SharedModule {
}
