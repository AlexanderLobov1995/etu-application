import {
  ChangeDetectionStrategy,
  Component,
  ElementRef, HostListener,
  ViewChild
} from '@angular/core';
import {AuthGuideState} from '../auth-guide-state';
import {AuthState} from '../auth/auth-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @ViewChild('menu') menu: ElementRef;
  menuActive = false;

  constructor(public authState: AuthState, public appState: AuthGuideState) {
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  submit() {
    this.appState.showAuthDialog = true;
  }

  logout() {
    this.authState.token = '';
  }

  @HostListener('window:click', ['$event'])
  closeMenu(event: any) {
    if (!this.menu.nativeElement.contains(event.target) && this.menuActive) {
      this.menuActive = false;
    }
  }
}
