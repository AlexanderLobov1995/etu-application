import {HttpClient, HttpParams,} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Todo} from './interfaces';
import {catchError, switchMap, tap} from "rxjs/operators";
import {BehaviorSubject, combineLatest, Observable, of, pipe, Subject} from "rxjs";

@Injectable()
export class TodoService {

  constructor(private httpClient: HttpClient) {}

  todos = new BehaviorSubject([]);

  createTodo(todoName: string) {
    const formData = new FormData();
    formData.append('todoName', todoName);
    return this.httpClient.post('https://localhost:8081/todos', formData)
      .toPromise()
      .then((todos: Todo[]) => {
        this.todos.next(todos);
      })
      .catch(()=> []);
  }

  update(todo: Todo) {
    const formData = new FormData();
    formData.append('_id', (todo._id).toString());
    formData.append('name', todo.name);
    formData.append('status', todo.status);
    return this.httpClient.put('https://localhost:8081/todos', formData)
      .toPromise()
      .then((todos: Todo[]) => {
        this.todos.next(todos);
      })
      .catch(()=> []);
  }

  deleteTodo(ids: number[]) {
    let params = new HttpParams();
    params = params.append('ids', ids.toString());
    return this.httpClient.delete('https://localhost:8081/todos', {params: params})
      .toPromise()
      .then((todos: Todo[]) => {
        this.todos.next(todos);
      })
      .catch(()=> [])
  }

  getTodos() {
    return this.httpClient.get('https://localhost:8081/todos')
      .toPromise()
      .then((todos: Todo[]) => {
        this.todos.next(todos);
      })
      .catch(()=> [])
  }
}
