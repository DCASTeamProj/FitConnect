import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialogComponent } from '../new-user-dialog/new-user-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  searchQuery: string = '';

  constructor(public dialog: MatDialog) {}

  openNewUserDialog(): void {
    this.dialog.open(NewUserDialogComponent, {
      width: '400px',
      disableClose: true
    });
  }  

  //add logic to search for users in
   onSearch() {
  console.log('Search query:', this.searchQuery);

   }
}
