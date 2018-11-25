import { NgModule } from '@angular/core';
import { LaboratoryOneComponent } from './laboratory-one/laboratory-one.component';
import { LaboratoryTwoComponent } from './laboratory-two/laboratory-two.component';
import { LaboratoryThreeComponent } from './laboratory-three/laboratory-three.component';
import { LaboratoryFourComponent } from './laboratory-four/laboratory-four.component';
import {SharedModule} from "../shared/shared.module";
import {UiKitModule} from "../ui-kit/ui-kit.module";
import {LaboratoryService} from "./laboratory.service";

@NgModule({
  imports: [
    SharedModule,
    UiKitModule
  ],
  providers: [LaboratoryService],
  declarations: [LaboratoryOneComponent, LaboratoryTwoComponent, LaboratoryThreeComponent, LaboratoryFourComponent],
  exports: [LaboratoryOneComponent, LaboratoryTwoComponent, LaboratoryThreeComponent, LaboratoryFourComponent]
})
export class LaboratoryModule { }
