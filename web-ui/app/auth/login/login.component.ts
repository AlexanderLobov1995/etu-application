import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppState} from "../../app-state";
import {AuthState} from "../auth-state";
import {AuthService} from "../auth.service";

const jwt = require('jsonwebtoken');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @ViewChild('authForm') authForm: NgForm;

  username = '';
  password = '';

  constructor(public authService: AuthService, private authState: AuthState, private appState: AppState) {
  }

  login() {
    if (this.authForm.valid) {
      this.authService.login(this.username, this.password)
        .subscribe((token: string) => {
          jwt.verify(token, 'etu', (err: any, decoded: any) => {
            if (decoded) {
              this.authState.token = token;
              this.authState.role = decoded.aud;
              this.appState.showAuthDialog = false;
            }
            console.log(decoded);
            console.log(err);
          });
        });
    }
  }
}