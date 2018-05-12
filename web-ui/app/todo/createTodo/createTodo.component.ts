import {Component} from "@angular/core";
import {AppState} from "../../app-state";

@Component({
  selector: 'app-create-todo',
  templateUrl: './createTodo.component.html',
  styleUrls: ['./createTodo.component.styl']
})
export class CreateTodoComponent {
  todoName = '';

  constructor(public appState: AppState){ }
}