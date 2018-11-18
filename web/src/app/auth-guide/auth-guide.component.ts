import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthGuideState} from './auth-guide-state';
import {AuthState} from './auth/auth-state';
import {NavigationState} from './navigation-state';
import {LoggerState} from './todo-logger/logger-state';
import {animate, group, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-auth-guide',
  templateUrl: './auth-guide.component.html',
  styleUrls: ['./auth-guide.component.styl'],
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          '* => up',
          [
            style({transform: 'translateY(-50%)', opacity: 0}),
            animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
          ],
        ),
        transition(
          '* => down', [
            style({transform: 'translateY(50%)', opacity: 0}),
            animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
          ],
        ),
        transition(
          '* => init', [
            style({'opacity': 0}),
            animate('300ms', style({opacity: 1}))
          ]
        )
      ]
    )
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthGuideComponent {

  constructor(public navigationState: NavigationState,
              public authState: AuthState,
              public appState: AuthGuideState,
              public loggerState: LoggerState) {
  }

  onClosePopup() {
    this.appState.hideDialog();
  }

  get page() {
    return this.navigationState.page;
  }

  get pageStatus() {
    console.log(this.navigationState.status)
    return this.navigationState.status;
  }

  get showStartPage() {
    return !this.authState.token;
  }

}
