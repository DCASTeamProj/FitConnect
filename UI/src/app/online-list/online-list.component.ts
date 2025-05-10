import { Component, Input } from '@angular/core';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-online-list',
  templateUrl: './online-list.component.html',
  styleUrls: ['./online-list.component.css']
})
export class OnlineListComponent {
 @Input() users: User[] = []; // Holds list of users from app.compon
}
