import { Component, OnInit } from '@angular/core';
import { User } from './Models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FitConnectUI2.0';
  users: User[] = []; // Holds list of users
  selectedUser: User | null = null; // Holds the current selected user object

constructor(private userService: UserService) {}
  
ngOnInit(): void {
  this.loadUsers(); // Loads users when the component initializes
}

loadUsers(): void {
  this.userService.getUsers().subscribe(
    (data) => {
      console.log('Fetched users:', data); // Logs the fetched users
      this.users = data; // Assigns the fetched users to the component's users property
    },
    (error) => {
      console.error('Error fetching users:', error); // Logs any errors
    }
  )
}

  onUserSelected(user: User): void {
    this.selectedUser = user; // Updates the selected user
    console.log('Selected user in app component:', user);
  }
}
