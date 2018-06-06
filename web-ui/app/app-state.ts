import {Injectable} from "@angular/core";
import {computed, observable} from "mobx-angular";
import {Todo} from "./todo-area/interfaces";

@Injectable()
export class AppState {
  @observable showAuthDialog = false;
  @observable showCreateDialog = false;
  @observable showUpdateDialog = false;
  @observable showLogger = false;
  @observable fullTodos: Todo[] = [];

  updateTodo: Todo;

  @computed get showPopupDialog(){
    return this.showAuthDialog || this.showCreateDialog || this.showUpdateDialog;
  }

  hideDialog() {
    this.showAuthDialog = false;
    this.showCreateDialog = false;
    this.showUpdateDialog = false;
  }
}