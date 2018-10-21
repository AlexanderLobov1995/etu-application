import {Injectable} from '@angular/core';
import {Todo} from './todo-area/interfaces';

@Injectable()
export class AuthGuideState {
  showAuthDialog = false;
  showCreateDialog = false;
  showUpdateDialog = false;
  showLogger = false;
  fullTodos: Todo[] = [];

  updateTodo: Todo;

  get showPopupDialog() {
    return this.showAuthDialog || this.showCreateDialog || this.showUpdateDialog;
  }

  hideDialog() {
    this.showAuthDialog = false;
    this.showCreateDialog = false;
    this.showUpdateDialog = false;
  }
}
