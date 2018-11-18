import {Injectable} from '@angular/core';
import {Todo} from './todo-area/interfaces';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class AuthGuideState {
  showPopupState = new BehaviorSubject('');

  updateTodo: Todo;

  get showPopupDialogValue() {
    console.log(this.showPopupState.getValue() === 'showAuthDialog')
    return this.showPopupState.getValue();
  }

  hideDialog() {
    this.showPopupState.next('');
  }
}
