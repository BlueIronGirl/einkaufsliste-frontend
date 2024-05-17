import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, retry, throwError} from "rxjs";
import {Artikel} from "../entities/artikel";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Einkaufszettel} from "../entities/einkaufszettel";

@Injectable({
  providedIn: 'root'
})
export class EinkaufszettelService {
  private api = `${environment.webserviceurl}`;

  constructor(private httpClient: HttpClient) {
  }

  private static errorHandler(error: HttpErrorResponse): Observable<never> {
    console.error('Fehler aufgetreten!' + error);
    return throwError(() => error);
  }

  getAllEinkaufszettel(): Observable<Einkaufszettel[]> {
    return this.httpClient.get<Einkaufszettel[]>(`${this.api}/einkaufszettel`).pipe(
      retry(3)
    );
  }

  createEinkaufszettel(einkaufszettel: Einkaufszettel) {
    return this.httpClient.post<Einkaufszettel>(`${this.api}/einkaufszettel`, einkaufszettel).pipe(
      catchError(EinkaufszettelService.errorHandler)
    );
  }

  updateEinkaufszettel(einkaufszettel: Einkaufszettel) {
    return this.httpClient.put<Einkaufszettel>(`${this.api}/einkaufszettel/${einkaufszettel.id}`, einkaufszettel).pipe(
      catchError(EinkaufszettelService.errorHandler)
    );
  }

  deleteEinkaufszettel(einkaufszettel: Einkaufszettel) {
    return this.httpClient.delete<Einkaufszettel>(`${this.api}/einkaufszettel/${einkaufszettel.id}`).pipe(
      catchError(EinkaufszettelService.errorHandler)
    );
  }

  createArtikel(einkaufszettelId: number, artikel: Artikel) {
    return this.httpClient.post<Artikel>(`${this.api}/einkaufszettel/${einkaufszettelId}/artikel`, artikel).pipe(
      catchError(EinkaufszettelService.errorHandler)
    );
  }

  updateArtikel(artikel: Artikel) {
    return this.httpClient.put<Artikel>(`${this.api}/einkaufszettel/artikel/${artikel.id}`, artikel).pipe(
      catchError(EinkaufszettelService.errorHandler)
    );
  }

  deleteArtikel(artikel: Artikel) {
    return this.httpClient.delete<Artikel>(`${this.api}/einkaufszettel/artikel/${artikel.id}`).pipe(
      catchError(EinkaufszettelService.errorHandler)
    );
  }

  archiviereArtikel() {
    return this.httpClient.post<Artikel[]>(`${this.api}/archiv/archiviereGekaufteArtikel`, null).pipe(
      catchError(EinkaufszettelService.errorHandler)
    );
  }

  loadAllArtikelArchiv(): Observable<Artikel[]> {
    return this.httpClient.get<Artikel[]>(`${this.api}/archiv`).pipe(
      retry(3)
    );
  }
}
