import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PersonInterface} from "../../person.interface";
import {PersonFormModalComponent} from "../person-form-modal/person-form-modal.component";

@Component({
  selector: 'app-hobbies-modal',
  templateUrl: './hobbies-modal.component.html',
  styleUrls: ['./hobbies-modal.component.css']
})
export class HobbiesModalComponent {

  public hobbiesModalFormGroup : FormGroup

  constructor(private fb:FormBuilder, public dialogClose: MatDialogRef<PersonFormModalComponent>,
  @Inject(MAT_DIALOG_DATA)
  public data: {  person?: PersonInterface }) {
    this.hobbiesModalFormGroup = this._buildModalFormGroup()
    this.patchForm()

  }
  private patchForm() {
    if (!this.data.person) {
      return;
    }

    const person = this.data.person;

    return this.hobbiesModalFormGroup.patchValue({
      hobbies:person.hobbies
    });
  }
  private _buildModalFormGroup(){
    return (this.hobbiesModalFormGroup = this.fb.group({
      hobbies: this.fb.control('')
  }))
}
  public sendNewHobbies(){
    const newHobbies = this.hobbiesModalFormGroup.value;
    this.dialogClose.close(newHobbies);
  }

}
