import {Injectable} from '@angular/core';
import {Todo} from './todo-area/interfaces';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class AuthGuideState {
  showPopupState = new BehaviorSubject('');
  tempUserId = new BehaviorSubject('');

  updateTodo: Todo;

  hideDialog() {
    this.showPopupState.next('');
  }
}
