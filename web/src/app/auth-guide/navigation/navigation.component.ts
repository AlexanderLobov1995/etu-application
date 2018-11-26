import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {NavigationState} from '../navigation-state';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  constructor(public navigationState: NavigationState, private changeDetector: ChangeDetectorRef) {
  }

  goUp() {
    if (this.navigationState.page > 0) {
      this.navigationState.page --;
      this.navigationState.status.next('up');
    }
  }

  goDown() {
    if (this.navigationState.page < 3) {
      this.navigationState.page ++;
      this.navigationState.status.next('down');
    }
  }

}
