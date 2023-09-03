import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {EinkaufszettelActions} from './einkaufszettel.actions';
import {EinkaufszettelService} from "../../service/einkaufszettel.service";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";


@Injectable()
export class EinkaufszettelEffects {
  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.register),
      map(action => action.data),
      concatMap(inputData => this.loginService.register(inputData).pipe(
        map(data => EinkaufszettelActions.registerSuccess({data: data})),
        catchError(error => of(EinkaufszettelActions.registerFailure({error})))
      ))
    )
  });

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EinkaufszettelActions.registerSuccess),
      tap((action) => {
        this.router.navigateByUrl("/login");
      }),
    ), {dispatch: false});

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.login),
      map(action => action.data),
      concatMap(inputData => this.loginService.login(inputData).pipe(
        map(data => EinkaufszettelActions.loginSuccess({data: data})),
        catchError(error => of(EinkaufszettelActions.loginFailure({error})))
      ))
    )
  });

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EinkaufszettelActions.loginSuccess),
      tap((action) => {
        this.loginService.saveLoginStateToLocalStorage(action.data);
        this.router.navigateByUrl("/einkaufszettel");
      }),
    ), {dispatch: false});

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.logout),
      map(() => EinkaufszettelActions.logoutSuccess()),
      tap(data => {
        this.loginService.saveLoginStateToLocalStorage(null);
        this.router.navigateByUrl("/login");
      }),
    )
  });

  loadEinkaufszettels$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.loadEinkaufszettels),
      switchMap(() => this.einkaufszettelService.getAll().pipe(
          map(artikels => EinkaufszettelActions.loadEinkaufszettelsSuccess({data: artikels})),
          catchError(error => of(EinkaufszettelActions.loadEinkaufszettelsFailure({error})))
        )
      )
    );
  });

  createArtikel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.createArtikel),
      map(action => action.data),
      concatMap(inputData => this.einkaufszettelService.createArtikel(inputData).pipe(
        map(data => EinkaufszettelActions.createArtikelSuccess({data: data})),
        catchError(error => of(EinkaufszettelActions.createArtikelFailure({error})))
      ))
    )
  });

  createArtikelSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EinkaufszettelActions.createArtikelSuccess),
      tap((action) => {
        this.router.navigateByUrl("/einkaufszettel");
      }),
    ), {dispatch: false});

  updateArtikel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.updateArtikel),
      map(action => action.data),
      concatMap(inputData => this.einkaufszettelService.updateArtikel(inputData).pipe(
        map(data => EinkaufszettelActions.updateArtikelSuccess({data: data})),
        catchError(error => of(EinkaufszettelActions.updateArtikelFailure({error})))
      ))
    )
  });

  updateArtikelSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EinkaufszettelActions.updateArtikelSuccess),
      tap((action) => {
        this.router.navigateByUrl("/einkaufszettel");
      }),
    ), {dispatch: false});

  deleteArtikel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.deleteArtikel),
      map(action => action.data),
      concatMap(inputData => this.einkaufszettelService.deleteArtikel(inputData).pipe(
        map(data => EinkaufszettelActions.deleteArtikelSuccess({data: data})),
        catchError(error => of(EinkaufszettelActions.deleteArtikelFailure({error})))
      ))
    )
  });

  archiviereArtikel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.archiviereArtikel),
      concatMap(inputData => this.einkaufszettelService.archiviereArtikel().pipe(
        map(data => EinkaufszettelActions.archiviereArtikelSuccess({data: data})),
        catchError(error => of(EinkaufszettelActions.archiviereArtikelFailure({error})))
      ))
    )
  });

  constructor(private actions$: Actions, private router: Router, private loginService: LoginService, private einkaufszettelService: EinkaufszettelService) {
  }
}
