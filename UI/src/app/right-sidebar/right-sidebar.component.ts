import { Component, Input } from '@angular/core';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent {
  @Input() users: User[] = []; // Holds list of users from app.compon
}
