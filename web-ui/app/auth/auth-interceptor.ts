import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {tap} from "rxjs/operators";
import {TodoLog, TodoLoggerRequest, TodoLoggerResponse} from "../todo-logger/logger-interfaces";
import {LoggerState} from "../todo-logger/logger-state";
import {AuthState} from "./auth-state";

@Injectable()
export class AuthInterceptor implements HttpInterceptor  {

  constructor(private injector: Injector, private loggerState: LoggerState){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('authorization') || req.url.endsWith('/configs') || req.url.endsWith('/auth') || req.method === 'OPTIONS') {
      return next.handle(req)
        .pipe(
          tap((res: HttpResponse<any>) => this.setLog(req, res))
         );
    }
    const authState = this.injector.get(AuthState);
    const subAuthReq = req.clone({
      setHeaders: {
        authorization: `Bearer ${authState.token}`
      }
    });
    return next.handle(subAuthReq)
      .pipe(
        tap((res: HttpResponse<any>) => this.setLog(subAuthReq, res))
      );
  }

  setLog (req: HttpRequest<any>, res: HttpResponse<any>) {
    if (res.body) {
      const request = {
        url: req.url,
        method: req.method,
        headers: [{
          name: 'authorization',
          value: req.headers.get('authorization')
        }]
      } as TodoLoggerRequest;
      const response = {
        body: res.body,
        statusCode: res.status,
        statusText: res.statusText
      } as TodoLoggerResponse;
      this.loggerState.loggs.push({request, response} as TodoLog)
    }
  };

}