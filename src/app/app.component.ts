import {Component} from '@angular/core';
import {findIndex} from "rxjs";

interface Person {
  id: number,
  name: string,
  hobbies: string[],
  gender?: string,
  isOnline?: boolean,
  visitCounts: number,
  likeCounts: number,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'FunctiiJS';
  public persons: Person[] = [];
  public idCounter = 0;
  public name = '';

  // public person : Person = {
  //   id : this.idCounter,
  //   name: this.name,
  //   hobbies : []
  // }

  constructor() {
    this.createPerson({
      id: this.idCounter,
      name: 'TheRank',
      hobbies: ['Fotbal', 'Box'],
      isOnline: true,
      visitCounts: 0,
      likeCounts: 0
    });
    this.createPerson({
      id: this.idCounter,
      name: 'Sorinelu',
      hobbies: ['Fotbal', 'Box', 'Programare'],
      isOnline: true,
      visitCounts: 0,
      likeCounts: 0
    });
    this.createPerson({
      id: this.idCounter,
      name: 'Andreea',
      hobbies: ['Fotbal', 'Box', 'Muzica'],
      gender: 'female',
      isOnline: false,
      visitCounts: 0,
      likeCounts: 0
    });
    this.createPerson({
      id: this.idCounter,
      name: 'Petrut',
      hobbies: [],
      isOnline: false,
      visitCounts: 0,
      likeCounts: 0
    });
    // this.deletePerson(1);
    this.addHobby(0, 'Sport');
    this.deleteHobby(0, '2lei');
    this.showOnlyPersonsWithHobby();
    this.showNameAndHobbyToPerson(1);
    this.showBoys();
    this.toggleAllPersonsOnlineState();
    this.groupPersonHobbies([1, 2], 'LOL');
    this.personVisited(2);
    this.sortByPopular();
  }

  public createPerson(person: Person) {
    this.persons.push(person)

    if (this.persons[this.idCounter].gender === undefined) {
      this.persons[this.idCounter].gender = 'male';
    }
    if (this.persons[this.idCounter].isOnline === undefined) {
      this.persons[this.idCounter].isOnline = true;
    }
    this.idCounter++;
    console.log(this.persons);
  }

  public deletePerson(id: number) {
    const findPerson = this.persons.find(person => person.id === id);
    if (findPerson != undefined) {
      const findIndex = this.persons.indexOf(findPerson);
      this.persons.splice(findIndex, 1);
    }
    console.log(this.persons);
  }

  public addHobby(id: number, newHobby: string) {
    const findPerson = this.persons.find(person => person.id === id);
    if (findPerson) {
      if (findPerson.hobbies.includes(newHobby)) {
        console.log('Acest hobby exista deja , adaugati altul')
      } else {
        findPerson.hobbies.push(newHobby)
      }
    } else {
      console.log('Nu exista persoana cu id ' + id);
    }
  }

  public deleteHobby(id: number, deletedHobby: string) {
    const findPerson = this.persons.find(person => person.id === id);
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
    const findPerson = this.persons.find(person => person.id === id);
    if (findPerson) {
      console.log('Numele persoanei este ' + findPerson.name);
      console.log('Iar aceasta are ca hobby : ' + findPerson.hobbies);
    } else {
      console.log('Nu exista persoana cu id : ' + id);
    }
  }

  public showBoys() {
    return this.persons.find(person => person.gender === 'male');
  }

  public showGirls() {
    return this.persons.find(person => person.gender === 'female');
  }

  public showOnlinePersons() {
    return this.persons.filter(person => person.isOnline === true);
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
    const findPerson = this.persons.find(person => person.id === id);
    if (findPerson != undefined) {
      const findIndexPerson = this.persons.indexOf(findPerson);
      this.persons[findIndexPerson].visitCounts++;
    }
  }

  public sortByPopular() {
    this.persons.sort(function (a, b) {
      return b.visitCounts - a.visitCounts;
    })
    console.log(this.persons);
  }
}
