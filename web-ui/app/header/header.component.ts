import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild} from "@angular/core";
import {AppState} from "../app-state";
import {AuthState} from "../auth/auth-state";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @ViewChild('menu') menu: ElementRef;
  menuActive = false;

  constructor(public authState: AuthState,
              public appState: AppState,
              public changeDetector: ChangeDetectorRef) {
    window.addEventListener('click', this.closeMenu);
  }

  toggleMenu() {
    console.log('toggle');
    this.menuActive = !this.menuActive;
  }

  submit() {
    this.appState.showAuthDialog = true;
  }

  logout() {
    this.authState.token = '';
  }

  closeMenu = (event: any) => {
    if (!this.menu.nativeElement.contains(event.target) && this.menuActive) {
      this.menuActive = false;
      this.changeDetector.markForCheck();
    }
  }
}