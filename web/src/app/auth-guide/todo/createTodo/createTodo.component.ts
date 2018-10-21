import {Component} from '@angular/core';
import {AuthGuideState} from '../../auth-guide-state';
import {Todo} from '../../todo-area/interfaces';
import {TodoService} from '../../todo-area/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './createTodo.component.html',
  styleUrls: ['./createTodo.component.styl']
})
export class CreateTodoComponent {
  todoName = '';

  constructor(public appState: AuthGuideState, private todoService: TodoService) {
  }

  createTodo() {
    this.todoService.createTodo(this.todoName).then((todos: Todo[]) => {
      this.appState.fullTodos = todos;
      this.appState.showCreateDialog = false;
    });
  }
}
