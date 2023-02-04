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
    this.addHobby(0 , 'Sport');
   this.deleteHobby(0 , '2lei');
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

  public addHobby(id:number , newHobby:string){
    const findPerson = this.persons.find(person => person.id===id);
    if(findPerson!=undefined) {
      if(findPerson.hobbies.includes(newHobby)){
        console.log('Acest hobby exista deja , adaugati altul')
      }else{
        findPerson.hobbies.push(newHobby)
      }
    }else{
      console.log('Nu exista persoana cu id '+id);
    }
  }

  public deleteHobby(id:number , deletedHobby:string){
    const findPerson = this.persons.find(person => person.id===id);
    if(findPerson!=undefined) {
      const findHobbyIndex = findPerson.hobbies.indexOf(deletedHobby);
      if (findHobbyIndex === -1) {
        console.log('Nu exista hobby ul : ' + deletedHobby);
      } else {
        findPerson.hobbies.splice(findHobbyIndex, 1);
      }
    }
  }

}
