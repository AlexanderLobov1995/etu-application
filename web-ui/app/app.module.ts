import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {AppState} from "./app-state";
import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {HeaderComponent} from "./header/header.component";
import {NavigationState} from "./navigation-state";
import {NavigationComponent} from "./navigation/navigation.component";
import {PopupComponent} from "./popup/popup.component";
import {RootComponent} from './root.component';
import {SharedModule} from "./shared/shared.module";
import {TodoAreaComponent} from "./todo-area/todo-area.component";
import {TodoService} from "./todo-area/todo.service";
import {TogoLoggerComponent} from "./todo-logger/togo-logger.component";
import {CreateTodoComponent} from "./todo/createTodo/createTodo.component";
import {UpdateTodoComponent} from "./todo/updateTodo/updateTodo.component";

@NgModule({
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule
  ],
  declarations: [AppComponent, RootComponent, NavigationComponent, HeaderComponent, PopupComponent, CreateTodoComponent, UpdateTodoComponent, TodoAreaComponent, TogoLoggerComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    NavigationState,
    AppState,
    TodoService
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
