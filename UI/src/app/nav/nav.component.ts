import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() users: User[] = []; //Get users from parent
  @Input() selectedUser: User | null = null; //get selected user from parent
  @Output() userSelected = new EventEmitter<User>(); //Emits selected user so other components can use
  searchQuery: string = '';

  constructor(public dialog: MatDialog, private userService: UserService) {}

  onUserSelect(user: User): void {
    this.userSelected.emit(user); // Emit the selected user
    console.log('Selected user:', user);
  }

  openNewUserDialog(): void {
    this.dialog.open(NewUserDialogComponent, {
      width: '400px',
      disableClose: true
    });
  }  

  //add logic to search
   onSearch() {
  console.log('Search query:', this.searchQuery);

   }
}
