import {Component} from '@angular/core';
import {GenderEnum} from "./gender.enum";

interface Person {
  id: number,
  name: string,
  hobbies: string[],
  gender?: string,
  isOnline: boolean,
  visitCounts: number,
  likeCounts: number,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  public persons: Person[] = [];
  public idCounter = 0;

  constructor() {
    this.createPerson('TheRank');
    this.createPerson('Sorinelu');
    this.createPerson('Andreea', GenderEnum.female);
    this.createPerson('Petrut',);
    this.deletePerson(10);
    this.addHobby(0, 'Sport');
    this.deleteHobby(0, '2lei');
    this.showOnlyPersonsWithHobby();
    this.showNameAndHobbyToPerson(1);
    this.showBoys();
    // this.toggleAllPersonsOnlineState();
    this.groupPersonHobbies([1, 2], 'LOL');
    this.personVisited(2);
    this.sortByPopular();
    this.likePerson(2);
    this.totalLikes();
    this.sortByPropName('visitCounts');
    this.filterPerson('Sor');
    console.log(this.totalBy('visitCounts'));
    console.log(this.countByGender(GenderEnum.male));
  }

  public createPerson(name: string, gender: GenderEnum = GenderEnum.male) {

    this.persons.push({
      id: this.idCounter,
      name,
      visitCounts: 0,
      likeCounts: 0,
      gender,
      isOnline: AppComponent._getRandomBoolean(),
      hobbies: [],
    })

    this.idCounter++;
    console.log(this.persons);
  }

  public deletePerson(id: number) {
    const findPerson = this._getPersonById(id);
    if (findPerson) {
      const findIndex = this.persons.indexOf(findPerson);
      this.persons.splice(findIndex, 1);
    } else {
      console.warn('Nu exista persoana cu id ' + id);
    }
    console.log(this.persons);
  }

  public addHobby(id: number, newHobby: string) {
    const findPerson = this._getPersonById(id);
    if (findPerson) {
      if (findPerson.hobbies.includes(newHobby)) {
        console.warn('Acest hobby exista deja , adaugati altul')
      } else {
        findPerson.hobbies.push(newHobby)
      }
    } else {
      console.warn('Nu exista persoana cu id ' + id);
    }
  }

  public deleteHobby(id: number, deletedHobby: string) {
    const findPerson = this._getPersonById(id);
    if (findPerson != undefined) {
      const findHobbyIndex = findPerson.hobbies.indexOf(deletedHobby);
      if (findHobbyIndex === -1) {
        console.log('Nu exista hobby ul : ' + deletedHobby);
      } else {
        findPerson.hobbies.splice(findHobbyIndex, 1);
      }
    }
  }

  public showOnlyPersonsWithHobby() {
    const result = this.persons.filter(person => person.hobbies.length > 0);
    console.log(result);
  }

  public showNameAndHobbyToPerson(id: number) {
    const findPerson = this._getPersonById(id);
    if (findPerson) {
      console.log('Numele persoanei este ' + findPerson.name);
      if(findPerson.hobbies.length>0)
      console.log('Iar aceasta are ca hobby : ' + findPerson.hobbies);
      else {
        console.warn('Iar aceasta nu are hobby uri')
      }
    } else {
      console.warn('Nu exista persoana cu id : ' + id);
    }
  }

  public showBoys() {
    return this.persons.filter(person => person.gender === 'male');
  }

  public showGirls() {
    return this.persons.filter(person => person.gender === 'female');
  }

  public showOnlinePersons() {
    return this.persons.filter(person => person.isOnline);
  }

  public setAllPersonsOnline() {
    for (let i = 0; i < this.persons.length; i++) {
      this.persons[i].isOnline = true;
    }
  }

  public setAllPersonsOffline() {
    for (let i = 0; i < this.persons.length; i++) {
      this.persons[i].isOnline = false;
    }
  }

  public toggleAllPersonsOnlineState() {
    const onlinePersons = this.showOnlinePersons().length;
    if (onlinePersons === 0) {
      console.log('Toate persoanele sunt offline');
    }
    if (onlinePersons === this.persons.length) {
      this.setAllPersonsOffline();
    } else {
      this.setAllPersonsOnline();
    }
  }

  public groupPersonHobbies(arrids: number[], newHobby: string) {
    for (let i = 0; i < arrids.length; i++) {
      this.addHobby(arrids[i], newHobby);
    }
  }

  public groupPersonDelete(arrids: number[]) {
    for (let i = 0; i < arrids.length; i++) {
      this.deletePerson(arrids[i]);
    }
  }

  public personVisited(id: number) {
    const findPerson = this._getPersonById(id);
    if (findPerson) {
      const findIndexPerson = this.persons.indexOf(findPerson);
      this.persons[findIndexPerson].visitCounts++;
    }
  }

  public sortByPopular() {
    this.persons.sort(function (firstPerson, secondPerson) {
      return secondPerson.visitCounts - firstPerson.visitCounts;
    })
    console.log(this.persons);
  }

  public likePerson(id: number) {
    const findPerson = this._getPersonById(id);
    if (findPerson) {
      const findIndexPerson = this.persons.indexOf(findPerson);
      this.persons[findIndexPerson].likeCounts++;
    }
  }

  public dislikePerson(id: number) {
    const findPerson = this._getPersonById(id);;
    if (findPerson) {
      const findIndexPerson = this.persons.indexOf(findPerson);
      this.persons[findIndexPerson].likeCounts--;
    }
  }

  public totalLikes() {
    let sumOfLikes = 0;
    for (let i = 0; i < this.persons.length; i++) {
      sumOfLikes += this.persons[i].likeCounts;
    }
    console.log(sumOfLikes)
    return sumOfLikes;
  }

  public sortById() {
    this.persons.sort(function (firstPerson, secondPerson) {
      return secondPerson.id - firstPerson.id;
    })
    console.log(this.persons);
  }

  public sortByName() {
    //BubbleSort
    for (let i = 0; i < this.persons.length; i++) {
      for (let j = 0; j < (this.persons.length - i - 1); j++) {
        if (this.persons[j].name > this.persons[j + 1].name) {
          let auxiliar = this.persons[j];
          this.persons[j] = this.persons[j + 1];
          this.persons[j + 1] = auxiliar;
        }
      }
    }
    console.log(this.persons);
  }

  public sortByLikeCount() {
    this.persons.sort(function (a, b) {
      return b.likeCounts - a.likeCounts;
    })
    console.log(this.persons);
  }

  public sortByIsOnline() {
    for (let i = 0; i < this.persons.length; i++) {
      for (let j = 0; j < (this.persons.length - i - 1); j++) {
        if (this.persons[j].isOnline > this.persons[j + 1].isOnline) {
          let auxiliar = this.persons[j];
          this.persons[j] = this.persons[j + 1];
          this.persons[j + 1] = auxiliar;
        }
      }
    }
  }

  public sortByGender() {
    for (let i = 0; i < this.persons.length; i++) {
      for (let j = 0; j < (this.persons.length - i - 1); j++) {
        // @ts-ignore
        if (this.persons[j].gender > this.persons[j + 1].gender) {
          let auxiliar = this.persons[j];
          this.persons[j] = this.persons[j + 1];
          this.persons[j + 1] = auxiliar;
        }
      }
    }
  }


  public sortByPropName(propName: string) {
    if (propName === 'id') {
      this.sortById();
    }
    if (propName === 'name') {
      this.sortByName();
    }
    if (propName === 'likeCounts') {
      this.sortByLikeCount();
    }
    if (propName === 'visitCounts') {
      this.sortByPopular();
    }
    if (propName === 'isOnline') {
      this.sortByIsOnline();
    }
    if (propName === 'gender') {
      this.sortByGender();
    }
  }

  public filterPerson(name: string) {
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].name.includes(name)) {
        console.log(this.persons[i].name)
      }
    }
  }

  public totalBy(propName: string) {
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
      console.log('Ati introdus o propietate incorecta !');
    }
    return;
  }

  public countByGender(gender: string) {
    let sumGenderMale = 0, sumGenderFemale = 0;
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].gender === 'male') {
        sumGenderMale++;
      }
      if (this.persons[i].gender === 'female') {
        sumGenderFemale++;
      }
    }
    if (gender === 'male') {
      return sumGenderMale;
    } else if (gender === 'female') {
      return sumGenderFemale;
    } else {
      console.log('Ati introdus un gen incorect');
    }
    return;
  }

  private static _getRandomBoolean(): boolean {
    return Math.random() > 0.5;
  }


  private _getPersonById(id: number): Person | undefined {
    return this.persons.find(person => person.id === id);
  }
}
