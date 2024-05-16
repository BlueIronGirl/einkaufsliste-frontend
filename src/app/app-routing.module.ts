import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {EditArtikelComponent} from "./components/edit-artikel/edit-artikel.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guard/auth-guard";
import {RegisterComponent} from "./components/register/register.component";
import {ArchivComponent} from "./components/archiv/archiv.component";
import {EditEinkaufszettelComponent} from "./components/edit-einkaufszettel/edit-einkaufszettel.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'einkaufszettel/:einkaufszettelId', component: EditEinkaufszettelComponent, canActivate: [AuthGuard]},
  {path: 'einkaufszettel', component: EditEinkaufszettelComponent, canActivate: [AuthGuard]},
  {path: 'archiv', component: ArchivComponent, canActivate: [AuthGuard]},
  {path: 'artikel/:einkaufszettelId/:artikelId', component: EditArtikelComponent, canActivate: [AuthGuard]},
  {path: 'artikel/new/:einkaufszettelId', component: EditArtikelComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
