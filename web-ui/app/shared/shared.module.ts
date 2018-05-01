import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {SvgIconComponent} from "./svg-icon/svg-icon.component";

@NgModule({
  imports: [CommonModule],
  declarations: [SvgIconComponent],
  exports: [SvgIconComponent, CommonModule]
})
export class SharedModule {
}
