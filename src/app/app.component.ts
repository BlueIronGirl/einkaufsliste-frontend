import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {EinkaufszettelActions} from "./store/einkaufszettel/einkaufszettel.actions";
import {selectLogin} from "./store/einkaufszettel/einkaufszettel.selectors";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // adminModus = false;
  userLoggedIn = false;
  menuCollapsed = true;

  constructor(private store: Store, private confirmationService: ConfirmationService,) {

  }

  ngOnInit(): void {
    this.store.select(selectLogin).subscribe(user => this.userLoggedIn = user != null);
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
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.store.dispatch(EinkaufszettelActions.logout());
      }
    });
  }

  toggleCollapseMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }
}
