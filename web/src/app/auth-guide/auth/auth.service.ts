import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of} from 'rxjs';

import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.httpClient.post('http://localhost:8081/auth', formData, {responseType: 'text'});
  }

  getAuthConfigs() {
    return this.httpClient.get('http://localhost:3000/configs');
  }
}
