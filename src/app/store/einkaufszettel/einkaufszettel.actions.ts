import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {HttpErrorResponse} from "@angular/common/http";
import {Artikel} from "../../entities/artikel";
import {User} from "../../entities/user";

export const EinkaufszettelActions = createActionGroup({
  source: 'Einkaufszettel',
  events: {
    'Register': props<{ data: User }>(),
    'Register Success': props<{ data: User }>(),
    'Register Failure': props<{ error: HttpErrorResponse }>(),

    'Login': props<{ data: User }>(),
    'Login Localstorage': props<{ data: User }>(),
    'Login Success': props<{ data: User }>(),
    'Login Failure': props<{ error: HttpErrorResponse }>(),

    'Logout': emptyProps(),
    'Logout Success': emptyProps(),

    'Load Einkaufszettels': emptyProps(),
    'Load Einkaufszettels Success': props<{ data: Artikel[] }>(),
    'Load Einkaufszettels Failure': props<{ error: HttpErrorResponse }>(),

    'Create Artikel': props<{ data: Artikel }>(),
    'Create Artikel Success' : props<{ data: Artikel }>(),
    'Create Artikel Failure': props<{ error: HttpErrorResponse }>(),

    'Update Artikel': props<{ data: Artikel }>(),
    'Update Artikel Success' : props<{ data: Artikel }>(),
    'Update Artikel Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Artikel': props<{ data: Artikel }>(),
    'Delete Artikel Success' : props<{ data: Artikel }>(),
    'Delete Artikel Failure': props<{ error: HttpErrorResponse }>(),

    'Archiviere Artikel': emptyProps(),
    'Archiviere Artikel Success' : props<{ data: Artikel[] }>(),
    'Archiviere Artikel Failure': props<{ error: HttpErrorResponse }>(),
  }
});
