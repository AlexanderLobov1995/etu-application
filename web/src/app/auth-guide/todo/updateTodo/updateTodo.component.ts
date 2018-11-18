import {Component, Input, OnInit} from '@angular/core';
import {AuthGuideState} from '../../auth-guide-state';
import {Todo} from '../../todo-area/interfaces';
import {TodoService} from '../../todo-area/todo.service';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-update-todo',
  templateUrl: './updateTodo.component.html',
  styleUrls: ['./updateTodo.component.styl']
})
export class UpdateTodoComponent implements OnInit {
  @Input() todo: Todo;

  todoName: string;
  status: string;

  constructor(public appState: AuthGuideState, private todoService: TodoService) {
  }

  ngOnInit() {
    this.status = this.todo.status;
    this.todoName = this.todo.name;
  }

  updateTodo() {
    const todo = {
      ...this.todo,
      name: this.todoName,
      status: this.status
    };
    this.todoService.update(todo).then(()=> {
      this.appState.showPopupState.next('');
    });
  }
}
