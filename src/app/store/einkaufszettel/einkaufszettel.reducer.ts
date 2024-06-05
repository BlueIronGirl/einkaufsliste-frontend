import {createReducer, on} from '@ngrx/store';
import {EinkaufszettelActions} from './einkaufszettel.actions';
import {Artikel} from "../../entities/artikel";
import {User} from "../../entities/user";
import {Einkaufszettel} from "../../entities/einkaufszettel";
import {Role} from "../../entities/role";

export const einkaufszettelFeatureKey = 'einkaufszettel';

export interface State {
  einkaufszettel: Einkaufszettel[];
  artikelsArchiv: Artikel[];
  loginUser: User | null;
  usersFriends: User[];
  users: User[];
  roles: Role[];
}

export const initialState: State = {
  einkaufszettel: [],
  artikelsArchiv: [],
  loginUser: null,
  usersFriends: [],
  users: [],
  roles: []
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

  // loadEinkaufszettels
  on(EinkaufszettelActions.loadEinkaufszettelsSuccess, (state, action) => {
    return {...state, einkaufszettel: action.data}
  }),

  // loadUsersFriends
  on(EinkaufszettelActions.loadUsersFriendsSuccess, (state, action) => {
    return {...state, usersFriends: action.data}
  }),

  // loadUsers
  on(EinkaufszettelActions.loadUsersSuccess, (state, action) => {
    return {...state, users: action.data}
  }),

  // loadRoles
  on(EinkaufszettelActions.loadRolesSuccess, (state, action) => {
    return {...state, roles: action.data}
  }),

  // loadArchiv
  on(EinkaufszettelActions.loadArchivSuccess, (state, action) => {
    return {...state, artikelsArchiv: action.data}
  }),
);

