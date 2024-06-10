import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../service/auth.service";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {EinkaufszettelActions} from "../store/einkaufszettel/einkaufszettel.actions";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private store: Store, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getActiveLoginToken();

    if (!this.auth.isLoginStateValid()) {
      this.router.navigateByUrl('/login')
      return throwError(() => new Error("Token nicht mehr valide!"));
    }

    if (!request.url.endsWith('refresh-token')) {
      this.store.dispatch(EinkaufszettelActions.refreshToken({data: token}));
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getActiveLoginToken()}`
      }
    });
    return next.handle(request);
  }
}
