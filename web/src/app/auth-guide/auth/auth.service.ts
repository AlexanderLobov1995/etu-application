import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of} from 'rxjs';

import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.httpClient.post('https://localhost:8081/auth/login', formData);
  }

  answer(answer: string, confirmAnswer: string) {
    const formData = new FormData();
    formData.append('answer', answer);
    formData.append('confirmAnswer', confirmAnswer);
    return this.httpClient.post('https://localhost:8081/auth/answer', formData);
  }

  signUp(firstName: string, lastName: string,
         phoneNumber: string, email: string,
         username: string, password: string,
         secretQuestion: string, secretAnswer: string) {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('secretQuestion', secretQuestion);
    formData.append('secretAnswer', secretAnswer);
    return this.httpClient.post('https://localhost:8081/auth/signup', formData);
  }

  logout() {
    return this.httpClient.delete('https://localhost:8081/auth/logout');
  }
}
