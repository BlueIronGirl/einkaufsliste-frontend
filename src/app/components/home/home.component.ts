import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {EinkaufszettelActions} from "../../store/einkaufszettel/einkaufszettel.actions";
import {selectAllEinkaufszettel} from "../../store/einkaufszettel/einkaufszettel.selectors";
import {Artikel} from "../../entities/artikel";
import {Einkaufszettel} from "../../entities/einkaufszettel";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  einkaufszettel!: Einkaufszettel[];

  constructor(private store: Store, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.store.dispatch(EinkaufszettelActions.loadEinkaufszettels());

    this.store.select(selectAllEinkaufszettel).subscribe(einkaufszettel => this.einkaufszettel = JSON.parse(JSON.stringify(einkaufszettel))); // deep copy of store, so that changes are possible
  }

  deleteArtikel(event: Event, artikel: Artikel) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Sind Sie sich sicher, dass Sie den Artikel löschen möchten?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.store.dispatch(EinkaufszettelActions.deleteArtikel({data: artikel}));
        this.store.dispatch(EinkaufszettelActions.loadEinkaufszettels());
      }
    });
  }

  changeArtikelGekauft(artikel: Artikel) {
    this.store.dispatch(EinkaufszettelActions.updateArtikel({data: artikel}));
  }
}
