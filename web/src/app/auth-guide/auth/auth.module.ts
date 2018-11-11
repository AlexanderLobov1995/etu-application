import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {UiKitModule} from '../ui-kit/ui-kit.module';
import {AuthInterceptor} from './auth-interceptor';
import {AuthState} from './auth-state';
import {AuthComponent} from './auth.component';
import {AuthService} from './auth.service';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './signup/signup.component';
import { AnswerComponent } from './answer/answer.component';

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    UiKitModule
  ],
  declarations: [LoginComponent, SignUpComponent, AuthComponent, AnswerComponent],
  exports: [LoginComponent, SignUpComponent, AnswerComponent, AuthComponent, HttpClientModule],
  providers: [
    AuthService,
    AuthState,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {
}
