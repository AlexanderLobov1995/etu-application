import {
  ChangeDetectionStrategy,
  Component,
  ElementRef, HostListener,
  ViewChild
} from '@angular/core';
import {AuthGuideState} from '../auth-guide-state';
import {AuthState} from '../auth/auth-state';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @ViewChild('menu') menu: ElementRef;
  menuActive = false;

  constructor(public authState: AuthState, public appState: AuthGuideState, private authService: AuthService) {}

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  logout() {
    this.authService.logout().toPromise().then(()=>{
      this.authState.token.next('');
    })
  }

  open(value) {
    console.log(value);
    this.appState.showPopupState.next(value);
  }

  @HostListener('window:click', ['$event'])
  closeMenu(event: any) {
    if (!this.menu.nativeElement.contains(event.target) && this.menuActive) {
      this.menuActive = false;
    }
  }
}
