import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {User} from "../../entities/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {EinkaufszettelActions} from "../../store/einkaufszettel/einkaufszettel.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user?: User;
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    name: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private store: Store, private router: Router, private messageService: MessageService) {
  }

  ngOnInit(): void {
    const user: User = {
      username: '',
      password: '',
      name: ''
    }
    this.loginForm.patchValue(user);
  }

  register() {
    const formValue = this.loginForm.getRawValue();
    const user: User = {...formValue};

    this.store.dispatch(EinkaufszettelActions.register({data: user}));
  }

  reset() {
    this.ngOnInit();
  }
}
