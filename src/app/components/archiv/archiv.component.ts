import {Component, OnInit} from '@angular/core';
import {Artikel} from "../../entities/artikel";
import {Store} from "@ngrx/store";
import {ArchivActions} from "../../store/archiv/archiv.actions";
import {selectAllArtikelArchiv} from "../../store/archiv/archiv.selectors";

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
    this.store.dispatch(ArchivActions.loadArchiv());

    this.store.select(selectAllArtikelArchiv).subscribe(artikels => this.artikels = [...artikels]);
  }
}
