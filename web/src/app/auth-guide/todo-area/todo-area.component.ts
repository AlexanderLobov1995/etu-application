import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthGuideState} from '../auth-guide-state';

import {AuthState} from '../auth/auth-state';
import {Todo} from './interfaces';
import {TodoService} from './todo.service';

@Component({
  selector: 'app-todo-area',
  templateUrl: './todo-area.component.html',
  styleUrls: ['./todo-area.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoAreaComponent {

  selectedTab = 0;

  constructor(public appState: AuthGuideState, public authState: AuthState, private todoService: TodoService) {
    this.todoService.getTodos().then((todos: Todo[]) => {
      appState.fullTodos = todos;
    });
  }

  get todos() {
    return this.selectedTab === 1 ? this.appState.fullTodos.filter((todo) => todo.status === 'completed') : this.appState.fullTodos;
  }

  updateTodo(todo: Todo) {
    this.appState.updateTodo = todo;
    this.appState.showUpdateDialog = true;
  }

  deleteTodos() {
    const ids = this.appState.fullTodos.filter((t) => t.checked).map((t) => t.id);
    this.todoService.deleteTodo(ids).then((todos: Todo[]) => {
      this.appState.fullTodos = todos;
    });
  }

}
