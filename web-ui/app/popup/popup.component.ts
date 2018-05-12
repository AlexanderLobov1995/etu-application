import {
  AfterViewChecked,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef, ViewChild,
} from "@angular/core";
import {AppState} from "../app-state";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent implements AfterViewChecked{
  @ViewChild('menu') menu: ElementRef;

  show = false;

  constructor(public appState: AppState, private changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewChecked() {
    this.show = !!this.menu.nativeElement.childElementCount;
    this.changeDetector.detectChanges();
  }
}