import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthGuideState} from '../auth-guide-state';

import {AuthState} from '../auth/auth-state';
import {Todo} from './interfaces';
import {TodoService} from './todo.service';
import {BehaviorSubject, combineLatest, of} from "rxjs";
import {map, switchMap, take, takeLast, tap} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";

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

  formGroup: FormGroup = new FormGroup({});

  todos = combineLatest(this.todoResponse, this.selectedTab).pipe(
    map(([todoResponse, selectedTab]) => {
      return selectedTab === 1 ? todoResponse.filter((todo) => todo.status === 'completed') : todoResponse
    }),
    tap(()=> {this.isLoading = false}),
    tap((todos)=> {
      this.formGroup = new FormGroup({});
      todos.map((todo)=> {
        this.formGroup.addControl(todo._id, new FormControl(false));
      })
    })
  );

  constructor(public appState: AuthGuideState, public authState: AuthState, private todoService: TodoService) {}

  setTab(value){
    this.selectedTab.next(value);
  }

  get tab(){
    return this.selectedTab.getValue();
  }

  updateTodo(todo: Todo) {
    this.appState.updateTodo = todo;
    this.appState.showUpdateDialog = true;
  }

  formControl(controlName) {
    return this.formGroup.controls[controlName];
  }

  isChecked(id) {
    return this.formControl(id).value;
  }

  deleteTodos() {
    const controlIds = Object.keys(this.formGroup.controls);
    const ids = controlIds.filter((id)=> this.isChecked(id));
    this.todoService.deleteTodo(ids);
  }

  ngOnInit(): void {
    this.todoService.getTodos();
  }

}
