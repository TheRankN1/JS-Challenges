import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppComponent} from "../../app.component";
@Component({
  selector: 'app-input',
  templateUrl: './person-form-modal.component.html',
  styleUrls: ['./person-form-modal.component.css']
})
export class PersonFormModalComponent {

  public personModalFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogClose: MatDialogRef<PersonFormModalComponent>,
  ) {
    this.personModalFormGroup = this._buildFormGroup();
  }

 public onCancelDialog() {
    this.dialogClose.close();
  }


  public onAddPerson() {
    const {name} = this.personModalFormGroup.value;
    this.dialogClose.close({name});
  }

  private _buildFormGroup() {
    return (this.personModalFormGroup = this.fb.group({
      name: this.fb.control(''),
      // gender: this.fb.control(''),
      // hobbies: this.fb.control(''),
    }))
  }

}
