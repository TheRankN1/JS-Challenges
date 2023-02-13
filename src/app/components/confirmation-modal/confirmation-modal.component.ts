import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PersonInterface} from "../../person.interface";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title : string ; message : any }) {
  }
}
