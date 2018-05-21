import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AuthState} from "./auth-state";

@Injectable()
export class AuthInterceptor implements HttpInterceptor  {

  constructor(private injector: Injector){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url);
    if (req.headers.has('authorization') || req.url.endsWith('/configs')) {
      return next.handle(req);
    }
    console.log(this.injector.get(AuthState));
    return next.handle(req);
    /*const authState = this.injector.get(AuthState);
    const subAuthReq = req.clone({
      setHeaders: {
        authorization: `Bearer ${authState.token}`
      }
    });
    return next.handle(subAuthReq);*/
  }

}