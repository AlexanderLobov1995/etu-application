import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.styl']
})
export class PageOneComponent implements OnInit, AfterViewInit {

  @Input() showStartPage;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log(this.showStartPage)
  }

}
