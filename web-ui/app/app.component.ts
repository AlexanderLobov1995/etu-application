import {Component} from '@angular/core';
import {AuthState} from "./auth/auth-state";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(authService: AuthService, authState: AuthState) {
    authService.getAuthConfigs().subscribe((res: any) => {
      authState.roles = res.roles || [];
      authState.level = res.level;
    });
  }
}
