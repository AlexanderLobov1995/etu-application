import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {TodoLoggerRequest, TodoLoggerResponse} from "./logger-interfaces";

@Component({
  selector: 'app-todo-logger',
  templateUrl: './togo-logger.component.html',
  styleUrls: ['./togo-logger.component.styl']
})
export class TogoLoggerComponent implements OnChanges, OnInit{
  @Input('loggs') loggs = [];
  request: TodoLoggerRequest;
  response: TodoLoggerResponse;

  ngOnChanges(changes: SimpleChanges) {
    console.log('keke', changes);
  }

  ngOnInit() {

  }
}