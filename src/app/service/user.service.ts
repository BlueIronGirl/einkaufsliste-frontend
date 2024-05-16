import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, retry, throwError} from "rxjs";
import {Artikel} from "../entities/artikel";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Einkaufszettel} from "../entities/einkaufszettel";
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
    return this.httpClient.get<User[]>(`${this.api}/user`).pipe(
      retry(3)
    );
  }
}
