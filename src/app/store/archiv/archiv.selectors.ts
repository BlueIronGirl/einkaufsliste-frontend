import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromArchiv from './archiv.reducer';
import {selectEinkaufszettelState} from "../einkaufszettel/einkaufszettel.selectors";

export const selectArchivState = createFeatureSelector<fromArchiv.State>(
  fromArchiv.archivFeatureKey
);

export const selectAllArtikelArchiv = createSelector(
  selectArchivState,
  state => state.artikelsArchiv
);
