import {Component, ElementRef, ViewChild} from "@angular/core";
import {AuthState} from "../auth/auth-state";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent {
  @ViewChild('menu') menu: ElementRef;
  menuActive = false;

  constructor(public authState: AuthState){
    window.addEventListener('click', this.closeMenu);
  }

  toggleMenu(){
    console.log('toggle');
    this.menuActive =!this.menuActive;
  }

  submit(){
    this.authState.showAuthDialog = true;
    this.menuActive =false;
  }

  closeMenu = () => {
   /* if(!this.menu.nativeElement.contains(event.target) && this.menuActive){
      console.log('here');
      this.menuActive = false;
    }*/
  }
}