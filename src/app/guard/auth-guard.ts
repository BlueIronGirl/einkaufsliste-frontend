import {Injectable} from '@angular/core';
import {LoginService} from "../service/login.service";
import {Router, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if(!this.loginService.isLoginStateValid()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
