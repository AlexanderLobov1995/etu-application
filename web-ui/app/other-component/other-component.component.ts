import { Component, OnInit } from '@angular/core';
import { OtherComponentService } from './other-component.service';
import { Observable } from 'rxjs/Observable';
import { Human } from '../interfaces';

@Component({
  selector: 'app-other-component',
  templateUrl: './other-component.component.html',
  styleUrls: ['./other-component.component.css']

})
export class OtherComponent implements OnInit {
  people: Observable<Human>;

  constructor(public otherComponentService: OtherComponentService) {
  }

  ngOnInit() {
    this.people = this.otherComponentService.getPeople();
  }
}
