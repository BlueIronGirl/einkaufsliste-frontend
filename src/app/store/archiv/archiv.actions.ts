import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Artikel} from "../../entities/artikel";
import {HttpErrorResponse} from "@angular/common/http";

export const ArchivActions = createActionGroup({
  source: 'Archiv',
  events: {
    'Load Archiv': emptyProps(),
    'Load Archiv Success': props<{ data: Artikel[] }>(),
    'Load Archiv Failure': props<{ error: HttpErrorResponse }>(),
  }
});
