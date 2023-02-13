import { Injectable } from '@angular/core';
import {PersonInterface} from "./person.interface";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public setPerson(person:PersonInterface[]){
    return localStorage.setItem('persons' , JSON.stringify(person));
  }
  public loadPerson(){
    const personFromDb = localStorage.getItem('persons')
    if (personFromDb) {
      return JSON.parse(personFromDb)
    }
  }
  constructor() { }
}
