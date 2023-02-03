import { Component } from '@angular/core';

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
  constructor() {
    this.createPerson({id:this.idCounter , name:'TheRank' , hobbies:['Fotbal' , 'Box']})
  }

  public createPerson (person:Person){
    this.persons.push(person)
    this.idCounter++;
    console.log(this.persons);
  }


}
