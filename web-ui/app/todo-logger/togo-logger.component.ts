import {Component} from "@angular/core";
import {TodoLoggerRequest, TodoLoggerResponse} from "./logger-interfaces";

@Component({
  selector: 'app-todo-logger',
  templateUrl: './togo-logger.component.html',
  styleUrls: ['./togo-logger.component.styl']
})
export class TogoLoggerComponent {
  request: TodoLoggerRequest;
  response: TodoLoggerResponse;
}