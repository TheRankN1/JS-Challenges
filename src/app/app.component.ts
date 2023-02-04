import { Component } from '@angular/core';
import {findIndex} from "rxjs";

interface Person {
  id:number,
  name:string,
  hobbies:string[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'FunctiiJS';
  public persons : Person[] = [];
  public idCounter = 0;
  public name = '';
  // public person : Person = {
  //   id : this.idCounter,
  //   name: this.name,
  //   hobbies : []
  // }

  constructor() {
    this.createPerson({id:this.idCounter , name:'TheRank' , hobbies:['Fotbal' , 'Box']});
    this.createPerson({id:this.idCounter , name:'Petrut' , hobbies:['Fotbal' , 'Box' , 'Muzica']});
    this.createPerson({id:this.idCounter , name:'Petrut' , hobbies:['Fotbal' , 'Box' , 'Muzica']});
    this.deletePerson(1);
  }

  public createPerson (person:Person){
    this.persons.push(person)
    this.idCounter++;
    console.log(this.persons);
  }

  public deletePerson(id:number){
    const findPerson = this.persons.find(person => person.id===id);
    if(findPerson!=undefined) {
     const findIndex = this.persons.indexOf(findPerson);
      this.persons.splice(findIndex , 1);
    }
  console.log(this.persons);
  }

}
