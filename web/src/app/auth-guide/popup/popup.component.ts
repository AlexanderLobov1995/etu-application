import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.styl']
})
export class PopupComponent implements AfterViewChecked {
  @ViewChild('menu') menu: ElementRef;
  @Input() show = false;
  @Output() close = new EventEmitter();

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewChecked() {
    console.log(this.changeDetector);
  }

  closeMenu(event: any) {
    if (!this.menu.nativeElement.contains(event.target) && this.show) {
      this.close.emit();
    }
  }
}
