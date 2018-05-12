import {Injectable} from "@angular/core";
import {computed, observable} from "mobx-angular";

@Injectable()
export class AppState {
  @observable showAuthDialog = false;
  @observable showCreateDialog = false;

  @computed get showPopupDialog(){
    console.log('computed');
    return this.showAuthDialog || this.showCreateDialog;
  }

}