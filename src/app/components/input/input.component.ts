import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  constructor(
    public dialogClose : MatDialogRef<InputComponent>,) { }
  closeDialog(){
    this.dialogClose.close();
  }
  ngOnInit(): void {
  }

}
