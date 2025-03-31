import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post } from '../Models/post.models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8000/api/posts/'; // need to update when get backend local

  //mock testing
  private mockPosts: Post[] = []; //stores mock posts

  constructor(private http: HttpClient) { }

  //use when back end is connected
  // createPost(post: Post): Observable<Post> {
  //   return this.http.post<Post>(this.baseUrl, post);
  // }

  // //gets posts for selected user
  // getUserPosts(userId: number): Observable<Post[]> {
  //   return this.http.get<Post[]>(`${this.baseUrl}?user=${userId}`);
  // }

  // Mock use only!!
  createPost(post: Post): Observable<Post> {
    const newPost = { ...post, id: this.mockPosts.length + 1, created_at: new Date() }; // Add mock ID and timestamp
    this.mockPosts.unshift(newPost); // Add the new post to the mock array
    console.log('Mock post created:', newPost);
    return of(newPost); // Simulate successful creation
  }

  // Mock getUserPosts method
  getUserPosts(userId: number): Observable<Post[]> {
    const userPosts = this.mockPosts.filter(post => post.user === userId); // Filter posts by user ID
    console.log(`Mock posts fetched for user ${userId}:`, userPosts);
    return of(userPosts); // Simulate fetching posts
  }
}
