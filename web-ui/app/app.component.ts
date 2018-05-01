import {Component} from '@angular/core';
import {AuthState} from "./auth/auth-state";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  pageOffset = 0;

  constructor(authService: AuthService, authState: AuthState) {
    authService.getAuthConfigs().subscribe((res: any) => {
      authState.roles = res.roles || [];
      authState.level = res.level;
    });
    window.addEventListener('mousewheel', this.onMouseWheel);
  }

  onMouseWheel = (e: any) => {
    if (e.wheelDelta > 0) {
      this.goUp();
    } else {
      this.goDown();
    }
  };

  goUp() {
    if (this.pageOffset < 0) {
      this.pageOffset += 100;
    }
  }

  goDown() {
    if (this.pageOffset > -200) {
      this.pageOffset -= 100;
    }
  }
}
