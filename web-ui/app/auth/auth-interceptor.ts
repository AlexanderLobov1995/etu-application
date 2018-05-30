import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {tap} from "rxjs/operators";
import {TodoLog, TodoLoggerRequest} from "../todo-logger/logger-interfaces";
import {LoggerState} from "../todo-logger/logger-state";
import {AuthState} from "./auth-state";

@Injectable()
export class AuthInterceptor implements HttpInterceptor  {

  constructor(private injector: Injector, private loggerState: LoggerState){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('authorization') || req.url.endsWith('/configs') || req.url.endsWith('/auth') || req.method === 'OPTIONS') {
      return next.handle(req)
        .pipe(
          tap(()=> console.log('1')),
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
        tap(()=> console.log('2')),
        tap((res: HttpResponse<any>) => this.setLog(subAuthReq, res))
      );
  }

  setLog = (req: HttpRequest<any>, res: HttpResponse<any>) => {
    const request = {
      url: req.url,
      method: req.method,
      statusCode: res.status,
      statusText: res.statusText
    } as TodoLoggerRequest;
    const response = {};
    console.log('request', req);
    console.log('response', res);
    this.loggerState.loggs.push({request, response} as TodoLog)
  };

}