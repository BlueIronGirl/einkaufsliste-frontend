import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, retry, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../entities/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = `${environment.webserviceurl}`;

  constructor(private httpClient: HttpClient) {
  }

  private static errorHandler(error: HttpErrorResponse): Observable<never> {
    console.error('Fehler aufgetreten!' + error);
    return throwError(() => error);
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.api}/user/friends`).pipe(
      retry(3)
    );
  }
}
