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

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    UiKitModule
  ],
  declarations: [LoginComponent, SignUpComponent, AuthComponent],
  exports: [LoginComponent, SignUpComponent, AuthComponent, HttpClientModule],
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
