import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UserResponse} from "../auth/auth-interfaces";

@Injectable()
export class LaboratoryService {
  constructor(private httpClient: HttpClient) {}

  check(header, payload, key): Observable<string> {
    const formData = new FormData();
    formData.append('header', header);
    formData.append('payload', payload);
    formData.append('key', key);
    return this.httpClient.post('https://localhost:8081/auth/jwt-token',formData) as Observable<string>;
  }

  getUser(token) {
    return this.httpClient.post('https://localhost:8081/auth/user', {}, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }

  getUserTodos(token) {
    return this.httpClient.get('https://localhost:8081/todos', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  getUserDetails(token): Observable<UserResponse> {
    return combineLatest(this.getUser(token), this.getUserTodos(token)).pipe(map(([user, todos])=> {
      return {...user, todos} as UserResponse;
    }))
  }
}
