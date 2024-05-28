import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {EinkaufszettelEffects} from "./store/einkaufszettel/einkaufszettel.effects";
import {einkaufszettelFeatureKey, einkaufszettelReducer} from "./store/einkaufszettel/einkaufszettel.reducer";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EditArtikelComponent} from './components/edit-artikel/edit-artikel.component';
import {InputNumberModule} from "primeng/inputnumber";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {LoginComponent} from './components/login/login.component';
import {TokenInterceptor} from "./interceptor/token-interceptor.service";
import {PasswordModule} from "primeng/password";
import {RegisterComponent} from './components/register/register.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ArchivComponent} from './components/archiv/archiv.component';
import {DividerModule} from "primeng/divider";
import {EditEinkaufszettelComponent} from './components/edit-einkaufszettel/edit-einkaufszettel.component';
import {MultiSelectModule} from "primeng/multiselect";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditArtikelComponent,
    LoginComponent,
    RegisterComponent,
    ArchivComponent,
    EditEinkaufszettelComponent
  ],
  imports: [
    // standard angular
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // ngrx
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([EinkaufszettelEffects]),
    StoreModule.forFeature(einkaufszettelFeatureKey, einkaufszettelReducer),

    //primeng
    ButtonModule,
    CardModule,
    CheckboxModule,
    InputNumberModule,
    PasswordModule,
    InputTextModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    DividerModule,
    MultiSelectModule,
    ConfirmDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    MessageService, ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
