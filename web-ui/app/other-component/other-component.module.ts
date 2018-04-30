import { NgModule } from '@angular/core';
import { OtherComponent } from './other-component.component';
import { HttpModule } from '@angular/http';
import { OtherComponentService } from './other-component.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
      HttpModule,
      CommonModule
    ],
    declarations: [
      OtherComponent
    ],
    providers: [
      OtherComponentService
    ]
  }
)
export class OtherModule {
}
