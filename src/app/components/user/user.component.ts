import {Component} from '@angular/core';
import {User} from "../../entities/user";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {Store} from "@ngrx/store";
import {ConfirmationService} from "primeng/api";
import {EinkaufszettelActions} from "../../store/einkaufszettel/einkaufszettel.actions";
import {selectAllRoles, selectAllUsers} from "../../store/einkaufszettel/einkaufszettel.selectors";
import {Role} from "../../entities/role";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  allUsers: User[] = [];
  allUsersCloned: User[] = [];

  allRoles: Role[] = [];

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private store: Store, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.store.dispatch(EinkaufszettelActions.loadUsers());
    this.store.dispatch(EinkaufszettelActions.loadRoles());

    this.store.select(selectAllUsers).subscribe(users => {
      this.allUsers = JSON.parse(JSON.stringify(users)); // deep copy
      this.allUsersCloned = JSON.parse(JSON.stringify(users));
    });

    this.store.select(selectAllRoles).subscribe(roles => {
      this.allRoles = roles;
    });
  }

  onRowEditSave(user: User) {
    this.store.dispatch(EinkaufszettelActions.updateUser({data: user}));
  }

  onRowEditCancel(rowIndex: number) {
    this.allUsers[rowIndex] = {...this.allUsersCloned[rowIndex]};
  }
}
