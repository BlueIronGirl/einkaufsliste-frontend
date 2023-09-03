import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromEinkaufszettel from './einkaufszettel.reducer';

export const selectEinkaufszettelState = createFeatureSelector<fromEinkaufszettel.State>(
  fromEinkaufszettel.einkaufszettelFeatureKey
);

export const selectLogin = createSelector(
  selectEinkaufszettelState,
  state => state.loginUser
);

export const selectAllArtikel = createSelector(
  selectEinkaufszettelState,
  state => state.artikels
);

export const selectArtikelById = (id: number) => createSelector(
  selectEinkaufszettelState,
  state => {
    return state.artikels[state.artikels.findIndex(artikel => artikel.id === id)];
  }
)
