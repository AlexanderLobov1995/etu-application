import {Injectable} from '@angular/core';
import {Todo} from './todo-area/interfaces';

@Injectable()
export class AuthGuideState {
  showAuthDialog = false;
  showCreateDialog = false;
  showUpdateDialog = false;
  showLogger = false;
  showLaboratoryOne = false;
  showLaboratoryTwo = false;
  showLaboratoryThree = false;
  showLaboratoryFour = false;

  updateTodo: Todo;

  get showPopupDialog() {
    return this.showAuthDialog || this.showCreateDialog || this.showUpdateDialog || this.showLaboratoryOne ||
    this.showLaboratoryTwo || this.showLaboratoryThree || this.showLaboratoryFour;
  }

  hideDialog() {
    this.showAuthDialog = false;
    this.showCreateDialog = false;
    this.showUpdateDialog = false;
    this.showLaboratoryOne = false;
    this.showLaboratoryTwo = false;
    this.showLaboratoryThree = false;
    this.showLaboratoryFour = false;
  }
}
