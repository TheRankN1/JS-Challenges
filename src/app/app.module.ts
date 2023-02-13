import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonFormModalComponent } from './components/person-form-modal/person-form-modal.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HobbiesModalComponent } from './components/hobbies-modal/hobbies-modal.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
;

@NgModule({
  declarations: [
    AppComponent,
    PersonFormModalComponent,
    HobbiesModalComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [PersonFormModalComponent],
})
export class AppModule { }
