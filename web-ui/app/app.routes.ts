import {Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {TestPageComponent} from "./test-pages/test-page.component";

export const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'test-page',
    component: TestPageComponent
  }
];
