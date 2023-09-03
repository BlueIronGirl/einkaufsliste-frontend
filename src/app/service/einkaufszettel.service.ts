import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, retry, throwError} from "rxjs";
import {Artikel} from "../entities/artikel";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EinkaufszettelService {
  private api = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  private static errorHandler(error: HttpErrorResponse): Observable<never> {
    console.error('Fehler aufgetreten!' + error);
    return throwError(() => error);
  }

  getAll(): Observable<Artikel[]> {
    return this.httpClient.get<Artikel[]>(`${this.api}/artikels`).pipe(
      retry(3)
    );
  }

  createArtikel(artikel: Artikel) {
    return this.httpClient.post<Artikel>(`${this.api}/artikels`, artikel).pipe(
      catchError(EinkaufszettelService.errorHandler)
    );
  }

  updateArtikel(artikel: Artikel) {
    return this.httpClient.put<Artikel>(`${this.api}/artikels/${artikel.id}`, artikel).pipe(
      catchError(EinkaufszettelService.errorHandler)
    );
  }

  deleteArtikel(artikel: Artikel) {
    return this.httpClient.delete<Artikel>(`${this.api}/artikels/${artikel.id}`).pipe(
      catchError(EinkaufszettelService.errorHandler)
    );
  }

  archiviereArtikel() {
    return this.httpClient.post<Artikel[]>(`${this.api}/archiv/archiviereGekaufteArtikel`, null).pipe(
      catchError(EinkaufszettelService.errorHandler)
    );
  }
}
