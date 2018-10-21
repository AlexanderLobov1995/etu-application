import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-todo-logger',
  templateUrl: './togo-logger.component.html',
  styleUrls: ['./togo-logger.component.styl']
})
export class TogoLoggerComponent implements OnChanges, OnInit {
  @Input('') loggs = [];
  _loggs = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this._loggs = changes.loggs.currentValue;
  }

  ngOnInit() {
    this._loggs = this.loggs;
  }

  get filteredLoggs() {
    return this._loggs.filter((log, index) => log && (this._loggs.length - index) <= 3);
  }
}
