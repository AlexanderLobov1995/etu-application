import { Routes } from '@angular/router';
import { OtherComponent } from './other-component/other-component.component';
import { AppComponent } from './app.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'other-component',
    component: OtherComponent
  }
];
