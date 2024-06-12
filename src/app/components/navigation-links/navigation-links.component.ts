import {Component, Input, OnInit} from '@angular/core';
import {ROLE_NAME, RoleName} from "../../entities/enum/rolename";
import {AuthActions} from "../../store/auth/auth.actions";
import {Store} from "@ngrx/store";
import {ConfirmationService} from "primeng/api";
import {AuthService} from "../../service/auth.service";
import {selectLogin} from "../../store/auth/auth.selectors";
import {User} from "../../entities/user";

@Component({
  selector: 'app-navigation-links',
  templateUrl: './navigation-links.component.html',
  styleUrls: ['./navigation-links.component.scss']
})
export class NavigationLinksComponent implements OnInit {

  protected readonly ROLE_NAME = ROLE_NAME;
  userRoles: RoleName[] = [];
  userIsLoggedIn = false;
  userLoggedIn: User | undefined;
  profileMenuVisible = false;

  constructor(private store: Store, private confirmationService: ConfirmationService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.store.select(selectLogin).subscribe(user => {
      this.userLoggedIn = user != null ? user : undefined;
      this.userIsLoggedIn = user != null;
      this.userRoles = [...this.authService.getAllRolesOfLoggedInUser()];
    });
  }

  hasRole(roleName: RoleName) {
    return this.userRoles.filter(role => role === roleName).length > 0
  }

  toggleProfileMenu() {
    this.profileMenuVisible = !this.profileMenuVisible;
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
}
