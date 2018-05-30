export interface TodoLoggerRequest {
  url: string;
  method: string;
  statusCode: number;
  headers: {
    authoriazation: string;
  }
}

export interface TodoLoggerResponse {
  body: string;
}