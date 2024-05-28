import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {EinkaufszettelActions} from "../../store/einkaufszettel/einkaufszettel.actions";
import {selectAllEinkaufszettel} from "../../store/einkaufszettel/einkaufszettel.selectors";
import {Artikel} from "../../entities/artikel";
import {Einkaufszettel} from "../../entities/einkaufszettel";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  einkaufszettel!: Einkaufszettel[];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(EinkaufszettelActions.loadEinkaufszettels());

    this.store.select(selectAllEinkaufszettel).subscribe(einkaufszettel => this.einkaufszettel = JSON.parse(JSON.stringify(einkaufszettel))); // deep copy of store, so that changes are possible
  }

  changeArtikelGekauft(artikel: Artikel) {
    this.store.dispatch(EinkaufszettelActions.updateArtikel({data: artikel}));
  }
}
