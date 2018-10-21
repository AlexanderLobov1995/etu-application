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
    if (this.navigationState.pageOffset < 0) {
      this.navigationState.pageOffset += 100;
      this.changeDetector.markForCheck();
    }
  }

  goDown() {
    if (this.navigationState.pageOffset > -200) {
      this.navigationState.pageOffset -= 100;
      this.changeDetector.markForCheck();
    }
  }

}