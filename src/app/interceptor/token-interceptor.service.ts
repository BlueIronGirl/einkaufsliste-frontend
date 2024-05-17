import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from "../service/login.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: LoginService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getActiveLoginToken()}`
      }
    });
    return next.handle(request);
  }
}
