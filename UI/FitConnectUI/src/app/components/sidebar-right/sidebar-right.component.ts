import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.css']
})
export class SidebarRightComponent {
  events = [
    { day: 20, month: 'February', title: 'Group Training', location: 'Madrid, Spain' },
    { day: 22, month: 'July', title: 'Group Training', location: 'Venice, Italy' }
  ];
}
