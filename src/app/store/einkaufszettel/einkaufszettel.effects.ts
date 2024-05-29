import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {EinkaufszettelActions} from './einkaufszettel.actions';
import {EinkaufszettelService} from "../../service/einkaufszettel.service";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {UserService} from "../../service/user.service";


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
        this.router.navigateByUrl("/home");
      }),
    ), {dispatch: false});

  loginFailure = createEffect(() =>
    this.actions$.pipe(
      ofType(EinkaufszettelActions.loginFailure),
      tap((action) => {
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Der Benutzername oder das Passwort sind falsch! Bitte überprüfen Sie Ihre Eingaben.'
        });
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
      this.loadAllEinkaufszettel()
    );
  });

  createEinkaufszettel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.createEinkaufszettel),
      concatMap(inputData => this.einkaufszettelService.createEinkaufszettel(inputData.data).pipe(
        map(data => EinkaufszettelActions.createEinkaufszettelSuccess({data: data})),
        catchError(error => of(EinkaufszettelActions.createEinkaufszettelFailure({error})))
      ))
    )
  });

  createEinkaufszettelSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.createEinkaufszettelSuccess),
      this.navigateToHome('Einkaufszettel wurde gespeichert'),
      this.loadAllEinkaufszettel()
    )
  });

  private navigateToHome(message: string) {
    return tap(() => {
      this.router.navigateByUrl("/home");
      this.messageService.clear();
      this.messageService.add({severity: 'success', summary: message});
    });
  }

  updateEinkaufszettel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.updateEinkaufszettel),
      map(action => action.data),
      concatMap(inputData => this.einkaufszettelService.updateEinkaufszettel(inputData).pipe(
        map(data => EinkaufszettelActions.updateEinkaufszettelSuccess({data: data})),
        catchError(error => of(EinkaufszettelActions.updateEinkaufszettelFailure({error})))
      ))
    )
  });

  updateEinkaufszettelSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.updateEinkaufszettelSuccess),
      this.navigateToHome('Einkaufszettel wurde gespeichert'),
      this.loadAllEinkaufszettel()
    )
  });

  deleteEinkaufszettel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.deleteEinkaufszettel),
      map(action => action.data),
      concatMap(inputData => this.einkaufszettelService.deleteEinkaufszettel(inputData).pipe(
        map(data => EinkaufszettelActions.deleteEinkaufszettelSuccess({data: data})),
        catchError(error => of(EinkaufszettelActions.deleteEinkaufszettelFailure({error})))
      )),
      this.loadAllEinkaufszettel()
    )
  });

  deleteEinkaufszettelSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.deleteEinkaufszettelSuccess),
      this.navigateToHome('Einkaufszettel wurde gelöscht'),
      this.loadAllEinkaufszettel()
    )
  });

  createArtikel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.createArtikel),
      concatMap(inputData => this.einkaufszettelService.createArtikel(inputData.einkaufszettelId, inputData.data).pipe(
        map(data => EinkaufszettelActions.createArtikelSuccess({data: data})),
        catchError(error => of(EinkaufszettelActions.createArtikelFailure({error})))
      ))
    )
  });

  createArtikelSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.createArtikelSuccess),
      this.navigateToHome('Artikel wurde gespeichert'),
      this.loadAllEinkaufszettel()
    )
  });

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

  updateArtikelSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.updateArtikelSuccess),
      this.navigateToHome('Artikel wurde gespeichert'),
      this.loadAllEinkaufszettel()
    )
  });

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

  deleteArtikelSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.deleteArtikelSuccess),
      this.navigateToHome('Artikel wurde gelöscht'),
      this.loadAllEinkaufszettel()
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

  archiviereArtikelSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.archiviereArtikelSuccess),
      this.navigateToHome('Artikel wurden archiviert'),
      this.loadAllEinkaufszettel()
    )
  });

  private loadAllEinkaufszettel() {
    return concatMap(() => this.einkaufszettelService.getAllEinkaufszettel().pipe(
      map(data => EinkaufszettelActions.loadEinkaufszettelsSuccess({data: data})),
      catchError(error => of(EinkaufszettelActions.loadEinkaufszettelsFailure({error})))
    ));
  }

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.loadUsers),
      switchMap(() => this.userService.getAllUsers().pipe(
          map(users => EinkaufszettelActions.loadUsersSuccess({data: users})),
          catchError(error => of(EinkaufszettelActions.loadUsersFailure({error})))
        )
      )
    );
  });

  loadArchiv$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EinkaufszettelActions.loadArchiv),
      switchMap(() => this.einkaufszettelService.loadAllArtikelArchiv().pipe(
          map(artikels => EinkaufszettelActions.loadArchivSuccess({data: artikels})),
          catchError(error => of(EinkaufszettelActions.loadArchivFailure({error})))
        )
      )
    );
  });

  constructor(private actions$: Actions, private messageService: MessageService, private router: Router, private loginService: LoginService, private einkaufszettelService: EinkaufszettelService, private userService: UserService) {
  }
}
