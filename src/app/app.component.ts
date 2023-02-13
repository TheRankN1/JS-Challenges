import {Component, Inject, OnInit} from '@angular/core';
import {GenderEnum} from "./gender.enum";
import {PersonInterface} from "./person.interface";
import {messages} from './messages';
import {PersonFormModalComponent} from "./components/person-form-modal/person-form-modal.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {HobbiesModalComponent} from "./components/hobbies-modal/hobbies-modal.component";
import {ConfirmationModalComponent} from "./components/confirmation-modal/confirmation-modal.component";
import {LocalStorageService} from "./local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  public idCounter = 0;

  public masterIndeterminate: boolean = false;
  public masterCheckbox: boolean = false;

  constructor(
    public dialogOpen: MatDialog,
    public storageService : LocalStorageService
  ) {
  console.log(this.persons)
  }
 ngOnInit() {
   this.storageService.loadPerson();
 }
  public persons: PersonInterface[] = this.storageService.loadPerson();
  public createPerson(name: string, hobbies: [], gender: GenderEnum = GenderEnum.male): void {

    this.persons.push({
      id: this.idCounter,
      name,
      visitCounts: 0,
      likeCounts: 0,
      gender,
      isChecked: AppComponent._getRandomBoolean(),
      hobbies,
    })

    this.storageService.setPerson(this.persons);
    this.idCounter++;
  }

  public openCreatePersonModal() {
    const dialogRef = this.dialogOpen.open(PersonFormModalComponent, {
      data: {onEditMode: false}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.createPerson(result.name, result.hobby.split(','));
      this.toggleMasterCheckboxCheckedState();
    });
    this.storageService.setPerson(this.persons);
  }

  public openEditPersonModal(person: PersonInterface) {
    const dialogRef = this.dialogOpen.open(PersonFormModalComponent, {
      data: {onEditMode: true, person}
    });
    dialogRef.afterClosed().subscribe((result) => {
      person.name = result.name
      person.hobbies = result.hobby
      this.storageService.setPerson(this.persons);
    });
  }

  public onUpdateHobbiesModal(person: PersonInterface) {
    const dialogRef = this.dialogOpen.open(HobbiesModalComponent, {data: {person}});
    dialogRef.afterClosed().subscribe((result) => {
      person.hobbies = result.hobbies.split(',');
      this.storageService.setPerson(this.persons);
    });
  }

  public onOpenConfirmationModal(title: string, message: string) {
    const dialogRef = this.dialogOpen.open(ConfirmationModalComponent, {
      data: {
        title: 'Sterge persoanele selectate : ',
        message: 'Ai selectat persoanele  : ' + this.showNameToCheckedPersons() + ' Esti sigur ca vrei sa le stergi ?'
      },
      width: '600px',
      height: '300px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log();
    })
  }

  public onAddTheSameHobbies(person:PersonInterface[]){
    const dialogRef = this.dialogOpen.open(HobbiesModalComponent, {data: {person}});
    dialogRef.afterClosed().subscribe((result) => {
     this.groupPersonHobbies(this.showIdsToCheckedPersons() , result.hobbies)
      this.storageService.setPerson(this.persons);
    });
  }

  public deletePerson(id: number): void {
    const findPerson = this._getPersonById(id);
    if (findPerson) {
      const findIndex = this.persons.indexOf(findPerson);
      this.persons.splice(findIndex, 1);
    } else {
      console.warn(messages.person_message + id + messages.not_exist);
    }
    this.storageService.setPerson(this.persons);
  }

  public addHobby(id: number, newHobby: string): void {
    const findPerson = this._getPersonById(id);
    if (findPerson) {
      if (findPerson.hobbies.includes(newHobby)) {
        console.warn('This hobby exist already  , try again')
      } else {
        findPerson.hobbies.push(newHobby)
      }
    } else {
      console.warn(messages.person_message + id + messages.not_exist);
    }
    this.storageService.setPerson(this.persons);
  }

  public deleteHobby(id: number, deletedHobby: string): void {
    const findPerson = this._getPersonById(id);
    if (findPerson != undefined) {
      const findHobbyIndex = findPerson.hobbies.indexOf(deletedHobby);
      if (findHobbyIndex === -1) {
        console.log("This hobby doesn't exist : " + deletedHobby);
      } else {
        findPerson.hobbies.splice(findHobbyIndex, 1);
      }
    }
    this.storageService.setPerson(this.persons);
  }

  public showOnlyPersonsWithHobby(): void {
    const result = this.persons.filter(person => person.hobbies.length > 0);

  }

  public showNameAndHobbyToPerson(id: number): void {
    const findPerson = this._getPersonById(id);
    if (findPerson) {
      console.log('The name of the person is ' + findPerson.name);
      if (findPerson.hobbies.length > 0)
        console.log('And this persons have hobbies : ' + findPerson.hobbies);
      else {
        console.warn("And this person doesn't have hobbies !")
      }
    } else {
      console.warn(messages.person_message + id + messages.not_exist);
    }
  }

  public showBoys(): PersonInterface[] {
    return this.persons.filter(person => person.gender === GenderEnum.male);
  }

  public showGirls(): PersonInterface[] {
    return this.persons.filter(person => person.gender === GenderEnum.female);
  }

  public showCheckedPersons(): PersonInterface[] {
    return this.persons.filter(person => person.isChecked);
  }

  public showNameToCheckedPersons() {
    let names = this.showCheckedPersons().map(person => person.name).join(',');
    return names;
  }
  public showIdsToCheckedPersons() {
    let ids = this.showCheckedPersons().map(person => person.id)
    return ids;
  }

  public setAllPersonsChecked(): void {
    for (let i = 0; i < this.persons.length; i++) {
      this.persons[i].isChecked = true;
    }
  }

  public setAllPersonsUnchecked(): void {
    for (let i = 0; i < this.persons.length; i++) {
      this.persons[i].isChecked = false;
    }
  }

  public toggleMasterCheckboxCheckedState() {
    const checkedPersons = this.showCheckedPersons().length;
    if (checkedPersons === 0) {
      this.masterIndeterminate = false;
      this.masterCheckbox = false;
      return;
    }
    if (checkedPersons === this.persons.length) {
      this.masterIndeterminate = false;
      this.masterCheckbox = true;
    } else {
      this.masterIndeterminate = true;
      this.masterCheckbox = true;
    }
    this.storageService.setPerson(this.persons);
  }

  public onToggleAllPersonCheckedState() {
    const checkedPersons = this.showCheckedPersons().length;
    if (checkedPersons === 0) {
      this.setAllPersonsChecked();
    }
    if (checkedPersons === this.persons.length) {
      this.setAllPersonsUnchecked();
    } else {
      this.setAllPersonsChecked();
    }
    this.storageService.setPerson(this.persons);
  }

  public onToggleCheckedState(id: number): void {
    const person = this._getPersonById(id);
    if (person)
      person.isChecked = !person.isChecked;
    this.storageService.setPerson(this.persons);
  }

  public groupPersonHobbies(arrids: number[], newHobby: string): void {
    for (let i = 0; i < arrids.length; i++) {
      this.addHobby(arrids[i], newHobby);
    }
    this.storageService.setPerson(this.persons);
  }

  public groupPersonDelete(arrids: number[]): void {
    for (let i = 0; i < arrids.length; i++) {
      this.deletePerson(arrids[i]);
    }
    this.storageService.setPerson(this.persons);
  }

  public personVisited(id: number): void {
    const findPerson = this._getPersonById(id);
    if (findPerson) {
      const findIndexPerson = this.persons.indexOf(findPerson);
      this.persons[findIndexPerson].visitCounts++;
    } else {
      console.warn(messages.person_message + id + messages.not_exist);
    }
    this.storageService.setPerson(this.persons);
  }

  public sortByPopular(): void {
    this.persons.sort(function (a, b) {
      return a.visitCounts - b.visitCounts;
    })
    this.storageService.setPerson(this.persons);
  }

  public likePerson(id: number): void {
    const findPerson = this._getPersonById(id);
    if (findPerson) {
      const findIndexPerson = this.persons.indexOf(findPerson);
      this.persons[findIndexPerson].likeCounts++;
    }
    this.storageService.setPerson(this.persons);
  }

  public dislikePerson(id: number): void {
    const findPerson = this._getPersonById(id);
    ;
    if (findPerson) {
      const findIndexPerson = this.persons.indexOf(findPerson);
      this.persons[findIndexPerson].likeCounts--;
    }
    this.storageService.setPerson(this.persons);
  }

  public totalLikes(): number {
    let sumOfLikes = 0;
    for (let i = 0; i < this.persons.length; i++) {
      sumOfLikes += this.persons[i].likeCounts;
    }

    return sumOfLikes;
  }

  public totalVisits(): number {
    let sumOfVisits = 0;
    for (let i = 0; i < this.persons.length; i++) {
      sumOfVisits += this.persons[i].visitCounts;
    }

    return sumOfVisits;
  }

  public sortByPropName(propName: any): void {
    this.persons.sort(function (a, b) {
      if ([a][propName] < [b][propName]) {
        return -1
      } else {
        return 1;
      }
    })
    this.storageService.setPerson(this.persons);
  }

  public increaseVisitCounts(id:number){
    this.persons[id].visitCounts++;
    this.storageService.setPerson(this.persons);
  }

  public filterPerson(name: string): void {
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].name.includes(name)) {
        console.log(this.persons[i].name)
      }
    }
    this.storageService.setPerson(this.persons);
  }

  public totalBy(propName: string): number | undefined {
    let sumLikes = 0, sumHobbies = 0, sumVisit = 0;
    for (let i = 0; i < this.persons.length; i++) {
      sumLikes += this.persons[i].likeCounts;
      sumVisit += this.persons[i].visitCounts;
      sumHobbies += this.persons[i].hobbies.length;
    }
    if (propName === 'likePerson') {
      return sumLikes;
    } else if (propName === 'hobbies') {
      return sumHobbies;
    } else if (propName === 'visitCounts') {
      return sumVisit;
    } else {
      console.warn('You person-form-modal a wrong prop !');
    }
    this.storageService.setPerson(this.persons);
    return;
  }

  public countByGender(gender: GenderEnum): number | undefined {
    let sumGenderMale = 0;
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].gender === GenderEnum.male) {
        sumGenderMale++;
      }
    }
    if (gender === GenderEnum.male) {
      return sumGenderMale;
    } else if (gender === GenderEnum.female) {
      return this.persons.length - sumGenderMale;
    } else {
      console.warn('You person-form-modal an incorrect gender !');
      this.storageService.setPerson(this.persons);
      return;
    }

  }

  private static _getRandomBoolean(): boolean {
    return Math.random() > 0.5;
  }


  private _getPersonById(id: number): PersonInterface | undefined {
    return this.persons.find(person => person.id === id);
  }
}

