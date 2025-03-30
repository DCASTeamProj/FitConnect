import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialogComponent } from '../new-user-dialog/new-user-dialog.component';
import { User } from '../Models/user.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  searchQuery: string = '';
  users: User[] = []; 

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); // loads users when component initializes to reduce delay
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
    (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onUserSelect(user: User): void {
    console.log('Selected user:', user);
  }

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
