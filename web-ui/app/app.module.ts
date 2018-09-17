import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {AppState} from "./app-state";
import {AppComponent} from './app.component';
import {appRoutes} from "./app.routes";
import {AuthModule} from "./auth/auth.module";
import {HeaderComponent} from "./header/header.component";
import {NavigationState} from "./navigation-state";
import {NavigationComponent} from "./navigation/navigation.component";
import {PopupComponent} from "./popup/popup.component";
import {RootComponent} from './root.component';
import {SharedModule} from "./shared/shared.module";
import {TestPageComponent} from "./test-pages/test-page.component";
import {TodoAreaComponent} from "./todo-area/todo-area.component";
import {TodoService} from "./todo-area/todo.service";
import {LoggerState} from "./todo-logger/logger-state";
import {TogoLoggerComponent} from "./todo-logger/togo-logger.component";
import {CreateTodoComponent} from "./todo/createTodo/createTodo.component";
import {UpdateTodoComponent} from "./todo/updateTodo/updateTodo.component";
import {UiKitModule} from "./ui-kit/ui-kit.module";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AuthModule,
    SharedModule,
    UiKitModule
  ],
  declarations: [AppComponent, RootComponent, NavigationComponent, HeaderComponent, PopupComponent, CreateTodoComponent, UpdateTodoComponent, TodoAreaComponent, TogoLoggerComponent, TestPageComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    NavigationState,
    AppState,
    TodoService,
    LoggerState
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
