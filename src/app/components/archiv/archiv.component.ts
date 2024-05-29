import {Component, OnInit} from '@angular/core';
import {Artikel} from "../../entities/artikel";
import {Store} from "@ngrx/store";
import {EinkaufszettelActions} from "../../store/einkaufszettel/einkaufszettel.actions";
import {selectAllArtikelArchiv} from "../../store/einkaufszettel/einkaufszettel.selectors";

@Component({
  selector: 'app-archiv',
  templateUrl: './archiv.component.html',
  styleUrls: ['./archiv.component.scss']
})
export class ArchivComponent implements OnInit {
  artikels!: Artikel[];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(EinkaufszettelActions.loadArchiv());

    this.store.select(selectAllArtikelArchiv).subscribe(artikels => this.artikels = [...artikels]);
  }
}
