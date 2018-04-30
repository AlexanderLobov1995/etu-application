import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {AuthModule} from "./auth/auth.module";
import {OtherModule} from './other-component/other-component.module';
import {RootComponent} from './root.component';

@NgModule({
  imports: [
    BrowserModule,
    OtherModule,
    AuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [AppComponent, RootComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
