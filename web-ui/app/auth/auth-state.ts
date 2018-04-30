import {Injectable} from "@angular/core";
import {computed, observable} from "mobx";
import {Level, Role} from "./auth-interfaces";

@Injectable()
export class AuthState {
  @observable roles : Role[];
  @observable level: Level;

  token = '';
  role = '';

  @computed get userLevel(){
     const role = this.roles.find((r)=> r.name === this.role);
    return role && role.value || 0;
  }
}