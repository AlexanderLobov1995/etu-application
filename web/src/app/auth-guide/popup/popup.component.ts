import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent implements AfterViewChecked {
  @ViewChild('menu') menu: ElementRef;
  @Output() close = new EventEmitter();

  show = false;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewChecked() {
    this.show = !!this.menu.nativeElement.childElementCount;
    this.changeDetector.detectChanges();
  }

  closeMenu(event: any) {
    console.log('popup');
    if (!this.menu.nativeElement.contains(event.target) && this.show) {
      console.log('here');
      this.close.emit();
    }
  }
}
