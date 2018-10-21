import {animate, style, transition, trigger} from "@angular/animations";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthGuideState} from '../auth-guide-state';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.styl'],
  animations: [
    trigger(
      'toggleAnimation',
      [
        transition(
          ':enter', [
            style({opacity: 0}),
            animate('500ms', style({opacity: 1}))
          ]
        ),
        transition(
          ':leave', [
            style({opacity: 1}),
            animate('0ms', style({opacity: 0}))
          ]
        )]
    )
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  selectedTab = 0;

  constructor(public appState: AuthGuideState) {
  }
}
