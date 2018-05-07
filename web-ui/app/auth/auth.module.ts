import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from "../shared/shared.module";
import {AuthState} from "./auth-state";
import {AuthComponent} from "./auth.component";
import {AuthService} from "./auth.service";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./signup/signup.component";

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [LoginComponent, SignUpComponent, AuthComponent],
  exports: [LoginComponent, SignUpComponent, AuthComponent],
  providers: [
    AuthService,
    AuthState
  ]
})
export class AuthModule {
}
