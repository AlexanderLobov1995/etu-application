import {Component} from '@angular/core';
import {AuthGuideState} from './auth-guide-state';
import {AuthState} from './auth/auth-state';
import {AuthService} from './auth/auth.service';
import {NavigationState} from './navigation-state';
import {LoggerState} from './todo-logger/logger-state';

@Component({
  selector: 'app-auth-guide',
  templateUrl: './auth-guide.component.html',
  styleUrls: ['./auth-guide.component.styl']
})
export class AuthGuideComponent {

  constructor(public navigationState: NavigationState,
              authService: AuthService,
              public authState: AuthState,
              public appState: AuthGuideState,
              public loggerState: LoggerState) {
    authService.getAuthConfigs().subscribe((res: any) => {
      authState.roles = res.roles || [];
      authState.level = res.level;
    });
  }

  onClosePopup() {
    this.appState.hideDialog();
  }

}
