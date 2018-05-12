import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class TodoService {
  constructor (private httpClient: HttpClient) {}

  createTodo() {
    return this.httpClient.post('', {});
  }

  update() {
    return this.httpClient.put('', {});
  }

  deleteTodo() {
    return this.httpClient.delete('');
  }

  getTodos() {
    return this.httpClient.get('');
  }
}