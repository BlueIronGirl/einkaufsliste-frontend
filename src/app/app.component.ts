import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {EinkaufszettelActions} from "./store/einkaufszettel/einkaufszettel.actions";
import {ConfirmationService} from "primeng/api";
import {AuthService} from "./service/auth.service";
import {ROLE_NAME, RoleName} from "./entities/enum/rolename";
import {AuthActions} from "./store/auth/auth.actions";
import {selectLogin} from "./store/auth/auth.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userLoggedIn = false;
  menuCollapsed = true;
  private userRoles: RoleName[] = [];

  constructor(private store: Store, private confirmationService: ConfirmationService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.store.select(selectLogin).subscribe(user => {
      this.userLoggedIn = user != null;
      this.userRoles = [...this.authService.getAllRolesOfLoggedInUser()];
    });
  }

  archiviereGekaufteArtikel() {
    this.store.dispatch(EinkaufszettelActions.archiviereArtikel());
  }

  logout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Sind Sie sich sicher, dass Sie sich ausloggen wollen?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Ja',
      rejectLabel: 'Nein',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.store.dispatch(AuthActions.logout());
      }
    });
  }

  toggleCollapseMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }

  hasRole(roleName: RoleName) {
    return this.userRoles.filter(role => role === roleName).length > 0
  }

  protected readonly ROLE_NAME = ROLE_NAME;
}
