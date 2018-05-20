import {ChangeDetectionStrategy, Component} from "@angular/core";
import {computed, observable} from "mobx-angular";
import {AppState} from "../app-state";
import {Todo} from "./interfaces";
import {TodoService} from "./todo.service";

@Component({
  selector: 'app-todo-area',
  templateUrl: './todo-area.component.html',
  styleUrls: ['./todo-area.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoAreaComponent {

  @observable selectedTab = 0;

  constructor (public appState: AppState, private todoService: TodoService) {
    this.todoService.getTodos().then((todos : Todo[]) => {
      appState.fullTodos = todos;
    });
  }

  @computed get todos () {
    console.log('keke');
    console.log(this.selectedTab);
    return this.selectedTab === 1 ? this.appState.fullTodos.filter((todo) => todo.status === 'completed' ): this.appState.fullTodos;
  }

  updateTodo(todo: Todo) {
    this.appState.updateTodo = todo;
    this.appState.showUpdateDialog = true;
  }

  deleteTodos() {
    const ids = this.appState.fullTodos.filter((t)=> t.checked).map((t)=> t.id);
    this.todoService.deleteTodo(ids).then((todos: Todo[]) => {
      this.appState.fullTodos = todos;
    });
  }

}