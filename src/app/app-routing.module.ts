import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EinkaufszettelComponent} from "./components/einkaufszettel/einkaufszettel.component";
import {EditArtikelComponent} from "./components/edit-artikel/edit-artikel.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guard/auth-guard";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  {path: '', redirectTo: 'einkaufszettel', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'einkaufszettel', component: EinkaufszettelComponent, canActivate: [AuthGuard]},
  {path: 'artikel/:id', component: EditArtikelComponent, canActivate: [AuthGuard]},
  {path: 'artikel/new', component: EditArtikelComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
