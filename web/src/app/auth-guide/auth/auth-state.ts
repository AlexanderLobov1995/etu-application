import {Injectable} from '@angular/core';
import {Level, Role, User} from './auth-interfaces';

@Injectable()
export class AuthState {
  roles: Role[];
  level: Level;
  user: User;

  showAuthDialog = false;

  token = '';
  role = '';

  get userLevel() {
    const role = this.roles.find((r) => r.name === this.role);
    return role && role.value || 0;
  }

  get accessCreate() {
    console.log('accessCreate');
    if (this.userLevel && this.level && this.level.create) {
      console.log(this.userLevel);
      console.log(this.level.create);
      return this.userLevel >= this.level.create;
    }
    return false;
  }

  get accessGet() {
    console.log('accessGet');
    if (this.userLevel && this.level && this.level.get) {
      console.log(this.userLevel);
      console.log(this.level.get);
      return this.userLevel >= this.level.get;
    }
    return false;
  }

  get accessUpdate() {
    console.log('accessUpdate');
    if (this.userLevel && this.level && this.level.update) {
      console.log(this.userLevel);
      console.log(this.level.update);
      return this.userLevel >= this.level.update;
    }
    return false;
  }

  get accessDelete() {
    console.log('accessDelete');
    if (this.userLevel && this.level && this.level.delete) {
      console.log(this.userLevel);
      console.log(this.level.delete);
      return this.userLevel >= this.level.delete;
    }
    return false;
  }

}
