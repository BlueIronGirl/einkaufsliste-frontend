import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {EinkaufszettelActions} from "../../store/einkaufszettel/einkaufszettel.actions";
import {selectAllArtikel} from "../../store/einkaufszettel/einkaufszettel.selectors";
import {Artikel} from "../../entities/artikel";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-einkaufszettel',
  templateUrl: './einkaufszettel.component.html',
  styleUrls: ['./einkaufszettel.component.scss']
})
export class EinkaufszettelComponent implements OnInit {
  artikels!: Artikel[];

  constructor(private store: Store, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.store.dispatch(EinkaufszettelActions.loadEinkaufszettels());

    this.store.select(selectAllArtikel).subscribe(artikels => this.artikels = artikels);
  }

  deleteArtikel(artikel: Artikel) {
    this.store.dispatch(EinkaufszettelActions.deleteArtikel({data: artikel}));
  }

  changeArtikelGekauft(artikel: Artikel) {
    let artikelNew = {...artikel, gekauft: !artikel.gekauft};
    this.store.dispatch(EinkaufszettelActions.updateArtikel({data: artikelNew}));

    this.messageService.clear();
    this.messageService.add({severity: 'success', summary: 'Artikel wurde gespeichert'});
  }
}
