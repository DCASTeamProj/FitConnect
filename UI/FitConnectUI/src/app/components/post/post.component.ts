import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  posts = [
    {
      profilePic: 'assets/images/profilePic.jpg',
      name: 'Baby',
      date: 'February 10 2025, 12:58 pm',
      text: 'Subscribe for more workout and nutrition tips!',
      image: 'assets/images/feed.jpg',
      likes: 120,
      comments: 45,
      shares: 20
    }
  ];
}
