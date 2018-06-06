import {Injectable} from "@angular/core";
import {computed, observable} from "mobx-angular";
import {Level, Role, User} from "./auth-interfaces";

@Injectable()
export class AuthState {
  @observable roles : Role[];
  @observable level: Level;
  @observable user: User;

  showAuthDialog = false;

  token = '';
  role = '';

  @computed get userLevel() {
    console.log('userLevel');
    const role = this.roles.find((r)=> r.name === this.role);
    return role && role.value || 0;
  }

  @computed get accessCreate() {
    console.log('accessCreate');
    if (this.userLevel && this.level && this.level.create) {
      console.log(this.userLevel);
      console.log(this.level.create);
      return this.userLevel >= this.level.create
    }
    return false;
  }

  @computed get accessGet() {
    console.log('accessGet');
    if (this.userLevel && this.level && this.level.get) {
      console.log(this.userLevel);
      console.log(this.level.get);
      return this.userLevel >= this.level.get
    }
    return false;
  }

  @computed get accessUpdate() {
    console.log('accessUpdate');
    if (this.userLevel && this.level && this.level.update) {
      console.log(this.userLevel);
      console.log(this.level.update);
      return this.userLevel >= this.level.update
    }
    return false;
  }

  @computed get accessDelete() {
    console.log('accessDelete');
    if (this.userLevel && this.level && this.level.delete) {
      console.log(this.userLevel);
      console.log(this.level.delete);
      return this.userLevel >= this.level.delete
    }
    return false;
  }

}