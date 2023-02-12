import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PersonInterface} from "../../person.interface";
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
  @Inject(MAT_DIALOG_DATA)
    public data:{person?: PersonInterface , onEditMode : boolean}
  ) {
    this.personModalFormGroup = this._buildFormGroup();
    this.patchForm()
  }

 public onCancelDialog() {
    this.dialogClose.close();
  }

  public onReturnPersonModalValue() {
    const person = this.personModalFormGroup.value;
    this.dialogClose.close(person);
  }


  private patchForm() {
    if (!this.data.person) {
      return;
    }

    const person = this.data.person;

    return this.personModalFormGroup.patchValue({
      hobby:person.hobbies,
      name : person.name,
    });
  }

  private _buildFormGroup() {
    return (this.personModalFormGroup = this.fb.group({
      name: this.fb.control(''),
      // gender: this.fb.control(''),
      hobby: this.fb.control(''),
    }))
  }

}
