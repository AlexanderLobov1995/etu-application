import {Component} from '@angular/core';
import {NavigationState} from "./navigation-state";
import {AuthState} from "./auth/auth-state";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {

  constructor(public navigationState: NavigationState, authService: AuthService, public authState: AuthState) {
    authService.getAuthConfigs().subscribe((res: any) => {
      authState.roles = res.roles || [];
      authState.level = res.level;
    });
  }
}
