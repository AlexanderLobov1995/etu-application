import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {EventDirective} from "./event.directive";
import {HeaderComponent} from "./header/header.component";
import {NavigationState} from "./navigation-state";
import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {AuthModule} from "./auth/auth.module";
import {NavigationComponent} from "./navigation/navigation.component";
import {OtherModule} from './other-component/other-component.module';
import {RootComponent} from './root.component';
import {SharedModule} from "./shared/shared.module";

@NgModule({
  imports: [
    BrowserModule,
    OtherModule,
    AuthModule,
    SharedModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [AppComponent, RootComponent, NavigationComponent, HeaderComponent, EventDirective],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    NavigationState
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
