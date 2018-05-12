import {ChangeDetectionStrategy, Component} from "@angular/core";
import {AppState} from "../app-state";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  selectedTab = 0;

  constructor(public appState: AppState){}
}