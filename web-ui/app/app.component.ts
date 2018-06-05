import { Component} from '@angular/core';
import {AppState} from "./app-state";
import {NavigationState} from "./navigation-state";
import {AuthState} from "./auth/auth-state";
import {AuthService} from "./auth/auth.service";
import {LoggerState} from "./todo-logger/logger-state";

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {

  constructor(public navigationState: NavigationState,
              authService: AuthService,
              public authState: AuthState,
              public appState: AppState,
              public loggerState: LoggerState ) {
    authService.getAuthConfigs().subscribe((res: any) => {
      authState.roles = res.roles || [];
      authState.level = res.level;
    });
  }

  onClosePopup(){
    this.appState.hideDialog();
  }
}
