import {Injectable} from '@angular/core';
import {Level, Role, User} from './auth-interfaces';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class AuthState {
  token = new BehaviorSubject('');
  user: User;

  showAuthDialog = false;

  get rights (){
    return this.user && this.user.rights || [];
  }

  get accessCreate() {
    return this.rights.find((r)=> r === 'create');
  }

  get accessGet() {
    return this.rights.find((r)=> r === 'get');
  }

  get accessUpdate() {
    return this.rights.find((r)=> r === 'update');
  }

  get accessDelete() {
    return this.rights.find((r)=> r === 'delete');
  }

}
