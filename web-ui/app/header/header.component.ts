import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from "@angular/core";
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
              public appState: AppState){
    window.addEventListener('click', this.closeMenu);
  }

  toggleMenu(){
    console.log('toggle');
    this.menuActive =!this.menuActive;
  }

  submit(){
    this.appState.showAuthDialog = true;
    this.menuActive = false;
  }

  logout() {
    this.authState.token = '';
    this.menuActive = false;
  }

  closeMenu = () => {
   /* if(!this.menu.nativeElement.contains(event.target) && this.menuActive){
      console.log('here');
      this.menuActive = false;
    }*/
  }
}