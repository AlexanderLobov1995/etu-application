import {HttpClient, HttpParams,} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Todo} from "./interfaces";

@Injectable()
export class TodoService {
  constructor(private httpClient: HttpClient) {
  }

  createTodo(todoName: string) {
    const formData = new FormData();
    formData.append('todoName', todoName);
    return this.httpClient.post('http://localhost:8081/todos', formData).toPromise();
  }

  update(todo: Todo) {
    const formData = new FormData();
    formData.append('id', (todo.id).toString());
    formData.append('name', todo.name);
    formData.append('status', todo.status);
    return this.httpClient.put('http://localhost:8081/todos', formData).toPromise();
  }

  deleteTodo(ids: number[]) {
    let params = new HttpParams();
    params = params.append('ids', ids.toString());
    return this.httpClient.delete('http://localhost:8081/todos', {params: params}).toPromise();
  }

  getTodos() {
    return this.httpClient.get('http://localhost:8081/todos').toPromise();
  }
}