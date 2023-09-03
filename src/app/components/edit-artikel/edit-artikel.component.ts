import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectArtikelById} from "../../store/einkaufszettel/einkaufszettel.selectors";
import {Artikel} from "../../entities/artikel";
import {EinkaufszettelActions} from "../../store/einkaufszettel/einkaufszettel.actions";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-edit-artikel',
  templateUrl: './edit-artikel.component.html',
  styleUrls: ['./edit-artikel.component.scss']
})
export class EditArtikelComponent implements OnInit {
  artikelForm: FormGroup = this.formBuilder.group({
    id: [{value: '', disabled: true}, Validators.required],
    name: [{value: ''}, Validators.compose([Validators.required, Validators.minLength(1)])],
    // kategorie: ['', Validators.compose([Validators.required, Validators.minLength(1)])], TODO
    anzahl: ['', Validators.compose([Validators.required, Validators.min(1)])],
    gekauft: ['', Validators.required]
  });

  edit: boolean = false;
  header: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private store: Store, private messageService: MessageService) {
  }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id >= 0) {
      this.initEdit(id);
    } else {
      this.initNew();
    }
  }

  private initEdit(id: number) {
    this.edit = true;
    this.header = 'Artikel bearbeiten';

    this.store.dispatch(EinkaufszettelActions.loadEinkaufszettels());

    this.store.select(selectArtikelById(id)).subscribe(artikel => this.artikelForm.patchValue(artikel));
  }

  private initNew() {
    const emptyArtikel: Artikel = {
      id: -1,
      name: '',
      anzahl: 1,
      gekauft: false
    };
    this.artikelForm.patchValue(emptyArtikel);
  }

  save() {
    const formValue = this.artikelForm.getRawValue();
    const artikel: Artikel = {...formValue};

    if (this.edit) {
      this.store.dispatch(EinkaufszettelActions.updateArtikel({data: artikel}));
    } else {
      this.store.dispatch(EinkaufszettelActions.createArtikel({data: artikel}));
    }

    this.messageService.add({severity:'success', summary:'Artikel wurde gespeichert'});
  }

  reset() {
    this.ngOnInit();
  }
}
