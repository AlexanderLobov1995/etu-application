import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthState} from '../auth-state';
import {AuthService} from '../auth.service';

/*import * as jwt from 'jsonwebtoken';*/

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  @ViewChild('authForm') authForm: NgForm;

  firstname = '';
  lastname = '';
  email = '';
  password = '';
  password2 = '';
  username = '';

  constructor(public authService: AuthService, private authState: AuthState) {
  }

  login() {
    if (this.authForm.valid) {
      this.authService.login(this.username, this.password)
        .subscribe((token: string) => {
          /*          jwt.verify(token, 'etu', (err: any, decoded: any) => {
                      if (decoded) {
                        this.authState.token = token;
                        this.authState.role = decoded.aud;
                      }
                      console.log(decoded);
                      console.log(err);
                    });*/
        });
    }
  }
}
