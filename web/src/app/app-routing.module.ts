import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuideComponent} from './auth-guide/auth-guide.component';

const routes: Routes = [{
  path: '**', component: AuthGuideComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
