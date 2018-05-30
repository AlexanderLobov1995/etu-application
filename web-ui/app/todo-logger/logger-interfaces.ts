export interface TodoLoggerRequest {
  url: string;
  method: string;
  statusCode: number;
  statusText: string;
  headers: {
    authoriazation?: string;
  }
}

export interface TodoLoggerResponse {
  body: string;
}

export interface TodoLog {
  request: TodoLoggerRequest;
  response: TodoLoggerResponse;
}