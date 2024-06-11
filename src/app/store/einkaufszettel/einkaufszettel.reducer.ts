import {createFeature, createReducer, on} from '@ngrx/store';
import {EinkaufszettelActions} from './einkaufszettel.actions';
import {Artikel} from "../../entities/artikel";
import {Einkaufszettel} from "../../entities/einkaufszettel";

export const einkaufszettelFeatureKey = 'einkaufszettel';

export interface State {
  einkaufszettel: Einkaufszettel[];
  artikelsArchiv: Artikel[];
}

export const initialState: State = {
  einkaufszettel: [],
  artikelsArchiv: []
};

export const einkaufszettelReducer = createReducer(
  initialState,

  // loadEinkaufszettels
  on(EinkaufszettelActions.loadEinkaufszettelsSuccess, (state, action) => {
    return {...state, einkaufszettel: action.data}
  }),

  // loadArchiv
  on(EinkaufszettelActions.loadArchivSuccess, (state, action) => {
    return {...state, artikelsArchiv: action.data}
  }),
);

export const einkaufszettelFeature = createFeature({
  name: einkaufszettelFeatureKey,
  reducer: einkaufszettelReducer,
});

