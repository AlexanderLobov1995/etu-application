import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthGuideState} from '../auth-guide-state';

import {AuthState} from '../auth/auth-state';
import {Todo} from './interfaces';
import {TodoService} from './todo.service';
import {BehaviorSubject, combineLatest, of} from "rxjs";
import {map, switchMap, take, takeLast, tap} from "rxjs/operators";

@Component({
  selector: 'app-todo-area',
  templateUrl: './todo-area.component.html',
  styleUrls: ['./todo-area.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoAreaComponent implements OnInit{

  selectedTab = new BehaviorSubject(0);

  todoResponse = this.todoService.todos;
  isLoading = true;

  checkList = new Set();

  todos = combineLatest(this.todoResponse, this.selectedTab).pipe(
    map(([todoResponse, selectedTab]) => {
      console.log(todoResponse)
      return selectedTab === 1 ? todoResponse.filter((todo) => todo.status === 'completed') : todoResponse
    }),
    tap(()=> {this.isLoading = false})
  );

  constructor(public appState: AuthGuideState, public authState: AuthState, private todoService: TodoService) {}

  setTab(value){
    this.checkList.clear();
    this.selectedTab.next(value);
  }

  get tab(){
    return this.selectedTab.getValue();
  }

  updateTodo(todo: Todo) {
    this.appState.updateTodo = todo;
    this.appState.showUpdateDialog = true;
  }

  checkTodo(id){
    if(this.checkList.has(id)) {
      this.checkList.delete(id);
    } else {
      this.checkList.add(id);
    }
  }

  isChecked(id){
    return this.checkList.has(id);
  }

  deleteTodos() {
    const ids = Array.from(this.checkList.values());
    this.todoService.deleteTodo(ids);
  }

  ngOnInit(): void {
    this.todoService.getTodos();
  }

}
