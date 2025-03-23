import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  searchQuery: string = '';

  constructor() {}


  //add logic to search for users in
   onSearch() {
  console.log('Search query:', this.searchQuery);

   }
}
