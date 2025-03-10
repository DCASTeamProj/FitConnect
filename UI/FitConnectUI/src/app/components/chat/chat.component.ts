import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  onlineUsers = [
    { image: 'assets/images/mike.jpg', name: 'Iron Mike' },
    { image: 'assets/images/DPHeadshot.jpg', name: 'Mr. Pool' },
    { image: 'assets/images/jim.jpg', name: 'Big Tuna' }
  ];
}
