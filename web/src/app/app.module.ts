import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuideState} from './auth-guide/auth-guide-state';
import {AuthGuideComponent} from './auth-guide/auth-guide.component';
import {AuthModule} from './auth-guide/auth/auth.module';
import {HeaderComponent} from './auth-guide/header/header.component';
import {NavigationState} from './auth-guide/navigation-state';
import {NavigationComponent} from './auth-guide/navigation/navigation.component';
import {PopupComponent} from './auth-guide/popup/popup.component';
import {SharedModule} from './auth-guide/shared/shared.module';
import {TodoAreaComponent} from './auth-guide/todo-area/todo-area.component';
import {TodoService} from './auth-guide/todo-area/todo.service';
import {LoggerState} from './auth-guide/todo-logger/logger-state';
import {TogoLoggerComponent} from './auth-guide/todo-logger/togo-logger.component';
import {CreateTodoComponent} from './auth-guide/todo/createTodo/createTodo.component';
import {UpdateTodoComponent} from './auth-guide/todo/updateTodo/updateTodo.component';
import {UiKitModule} from './auth-guide/ui-kit/ui-kit.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthGuideComponent,
    NavigationComponent,
    HeaderComponent,
    PopupComponent,
    CreateTodoComponent,
    UpdateTodoComponent,
    TodoAreaComponent,
    TogoLoggerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    UiKitModule,
    HttpClientModule
  ],
  providers: [
    NavigationState,
    AuthGuideState,
    TodoService,
    LoggerState
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
