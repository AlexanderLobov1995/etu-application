import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.styl']
})
export class PageOneComponent implements OnInit {

  @Input() showStartPage;

  constructor() { }

  ngOnInit() {
  }

}
