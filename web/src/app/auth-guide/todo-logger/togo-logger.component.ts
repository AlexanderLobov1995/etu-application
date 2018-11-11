import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-todo-logger',
  templateUrl: './togo-logger.component.html',
  styleUrls: ['./togo-logger.component.styl']
})
export class TogoLoggerComponent {
  @Input('') loggs = [];
}

