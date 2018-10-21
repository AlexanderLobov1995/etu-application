import {Todo} from '../todo-area/interfaces';

export interface TodoLoggerRequest {
  url: string;
  method: string;
  headers: Header[];
}

export interface TodoLoggerResponse {
  body: Todo[];
  statusCode: number;
  statusText: string;
}

export interface TodoLog {
  request: TodoLoggerRequest;
  response: TodoLoggerResponse;
}

export interface Header {
  name: string;
  value: string;
}
