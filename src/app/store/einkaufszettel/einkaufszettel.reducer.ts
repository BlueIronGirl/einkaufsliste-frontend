import {createReducer, on} from '@ngrx/store';
import {EinkaufszettelActions} from './einkaufszettel.actions';
import {Artikel} from "../../entities/artikel";
import {User} from "../../entities/user";

export const einkaufszettelFeatureKey = 'einkaufszettel';

export interface State {
  artikels: Artikel[];
  loginUser: User | null;
}

export const initialState: State = {
  artikels: [],
  loginUser: null
};

export const einkaufszettelReducer = createReducer(
  initialState,
  // register
  on(EinkaufszettelActions.registerSuccess, (state, action) => {
    return {...state, loginUser: action.data}
  }),

  // login
  on(EinkaufszettelActions.loginSuccess, (state, action) => {
    return {...state, loginUser: action.data}
  }),
  on(EinkaufszettelActions.loginLocalstorage, (state, action) => {
    return {...state, loginUser: action.data}
  }),

  // logout
  on(EinkaufszettelActions.logout, (state, action) => {
    return {...state, loginUser: null}
  }),

  // loadEinkaufszettel
  on(EinkaufszettelActions.loadEinkaufszettelsSuccess, (state, action) => {
    return {...state, artikels: action.data}
  }),

  // addArtikel
  on(EinkaufszettelActions.createArtikelSuccess, (state, action) => {
    let artikels = [...state.artikels, action.data];
    return {...state, artikels: artikels};
  }),

  // updateArtikel
  on(EinkaufszettelActions.updateArtikelSuccess, (state, action) => {
    let indexToUpdate = state.artikels.findIndex(item => item.id === action.data.id);

    let artikels = [...state.artikels];
    if (indexToUpdate >= 0) {
      artikels[indexToUpdate] = action.data;
    }

    return {...state, artikels: artikels};
  }),

  // deleteArtikel
  on(EinkaufszettelActions.deleteArtikelSuccess, (state, action) => {
    let indexToRemove = state.artikels.findIndex(item => item.id === action.data.id);

    let artikels = [...state.artikels];
    if (indexToRemove >= 0) {
      artikels.splice(indexToRemove, 1);
    }

    return {...state, artikels: artikels};
  }),

  // archiviereArtikel
  on(EinkaufszettelActions.archiviereArtikelSuccess, (state, action) => {
    let artikels = [...state.artikels];

    for (let artikel of action.data) {
      let indexToRemove = artikels.findIndex(item => item.id === artikel.id);
      if (indexToRemove >= 0) {
        artikels.splice(indexToRemove, 1);
      }
    }

    return {...state, artikels: artikels};
  }),
);

