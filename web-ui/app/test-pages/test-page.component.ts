import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  selector: 'app-test-page',
  templateUrl:'./test-page.component.html',
  styleUrls: ['./test-page.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPageComponent {

}