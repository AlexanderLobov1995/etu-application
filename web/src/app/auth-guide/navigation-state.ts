import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class NavigationState {
  page = 0;
  status = new BehaviorSubject('init');
}
