import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {EventDirective} from "../event.directive";
import {SvgIconComponent} from "./svg-icon/svg-icon.component";

@NgModule({
  imports: [CommonModule],
  declarations: [SvgIconComponent, EventDirective],
  exports: [SvgIconComponent, CommonModule, EventDirective]
})
export class SharedModule {
}
