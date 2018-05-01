import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthState} from "./auth-state";
import {AuthService} from "./auth.service";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./signup/signup.component";

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule
  ],
  declarations: [LoginComponent, SignUpComponent],
  exports: [LoginComponent, SignUpComponent],
  providers: [
    AuthService,
    AuthState
  ]
})
export class AuthModule {
}
