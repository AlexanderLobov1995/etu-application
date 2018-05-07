import {Component} from "@angular/core";
import {AuthState} from "./auth-state";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.styl']
})
export class AuthComponent {
  selectedTab = 0;

  constructor(public authState: AuthState){}
}