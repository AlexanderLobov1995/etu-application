import {Component, Input, OnInit} from "@angular/core";
import {AppState} from "../../app-state";
import {Todo} from "../../todo-area/interfaces";
import {TodoService} from "../../todo-area/todo.service";

@Component({
  selector: 'app-update-todo',
  templateUrl: './updateTodo.component.html',
  styleUrls: ['./updateTodo.component.styl']
})
export class UpdateTodoComponent implements OnInit{
  @Input('todo') todo: Todo;

  todoName: string;
  status: string;

  constructor(public appState: AppState, private todoService: TodoService) {}

  ngOnInit() {
    this.status = this.todo.status;
    this.todoName = this.todo.name;
  }

  //TODO: fucking method
  updateTodo() {
    this.todo.name = this.todoName;
    this.todo.status = this.status;
    this.todoService.update(this.todo).then((todos: Todo[]) => {
      this.appState.fullTodos = todos;
      this.appState.showUpdateDialog = false;
    });
  }
}