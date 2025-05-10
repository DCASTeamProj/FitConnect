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
  @Output() userListUpdated = new EventEmitter<void>();
  @Input() user: any; // holds the current user object
  searchQuery: string = '';

  constructor(public dialog: MatDialog, private userService: UserService) {}

  onUserSelect(user: User): void {
    this.userSelected.emit(user); // Emit the selected user
    console.log('Selected user:', user);
  }

  openNewUserDialog(): void {
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
          this.userListUpdated.emit(); // Emit event to notify parent to refresh the user list
            console.log('New user added successfully.');
          }
    });
  }  

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      this.userService.deleteUser(user.id!).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id); // Remove the user from the list
          console.log(`${user.username} deleted successfully.`);
        },
        error: (err) => console.error('Error deleting user:', err)
      });
    }
  }

  //add logic to search
   onSearch() {
  console.log('Search query:', this.searchQuery);
   }
}
