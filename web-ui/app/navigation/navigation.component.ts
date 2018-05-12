import {ChangeDetectionStrategy, Component} from "@angular/core";
import {NavigationState} from "../navigation-state";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  constructor(public navigationState: NavigationState) {
    window.addEventListener('mousewheel', this.onMouseWheel);
  }

  onMouseWheel = (e: any) => {
    if (e.wheelDelta > 0) {
      this.goUp();
    } else {
      this.goDown();
    }
  };

  goUp() {
    if (this.navigationState.pageOffset < 0) {
      this.navigationState.pageOffset += 100;
    }
  }

  goDown() {
    if (this.navigationState.pageOffset > -200) {
      this.navigationState.pageOffset -= 100;
    }
  }

}