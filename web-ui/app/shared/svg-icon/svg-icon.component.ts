import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-icon',
    templateUrl: './svg-icon.component.html',
    styleUrls: ['./svg-icon.component.styl']
  }
)
export class SvgIconComponent {
  @Input() ic = '';
}