import {Component} from "@angular/core";
import {AppState} from "../app-state";
import {TodoService} from "./todo.service";

@Component({
  selector: 'app-todo-area',
  templateUrl: './todo-area.component.html',
  styleUrls: ['./todo-area.component.styl']
})
export class TodoAreaComponent {
  constructor (public appState: AppState, private todoService: TodoService) {
    console.log(this.todoService);
  }

}