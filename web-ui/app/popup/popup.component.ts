import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core";
import {AppState} from "../app-state";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent {
  constructor(public appState: AppState) {
  }
}