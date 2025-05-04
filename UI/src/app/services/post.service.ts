import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post } from '../Models/post.models';
import { PostComment } from '../Models/comment.model'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8000/api/posts/'; 

  //mock testing
  // private mockPosts: Post[] = []; //stores mock posts
  // private mockComments: { [postId: number]: PostComment[] } = {}; //stores mock comments

  constructor(private http: HttpClient) { }

  //use when back end is connected
  createPost(postData: FormData): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, postData).pipe(
      map((createdPost: Post) => {
        // Simulate adding the created post to the top of the list (if needed)
        console.log('API post created:', createdPost);
        return createdPost;
      })
    );
  }

  //gets posts for selected user
  getUserPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}?user=${userId}`).pipe(
      map((posts: Post[]) => {
        // Sort posts by creation date in descending order
        return posts.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime());
      })
    );
  }

  getCommments(postId: number): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(`${this.baseUrl}${postId}/comments/`);
  }

  createComment(comment: PostComment): Observable<PostComment> {
    
    return this.http.post<PostComment>(`${this.baseUrl}${comment.post}/comments/`, comment);
  }

   editComment(comment: PostComment): Observable<PostComment> {
     return this.http.put<PostComment>(`${this.baseUrl}${comment.post}/comments/${comment.id}/`, comment);
   }

  // Mock use only!!
//   createPost(post: Post): Observable<Post> {
//     const newPost = { ...post, id: this.mockPosts.length + 1, created_at: new Date() }; // Add mock ID and timestamp
//     this.mockPosts.unshift(newPost); // Add the new post to the mock array
//     console.log('Mock post created:', newPost);
//     return of(newPost); // Simulate successful creation
//   }

//   getUserPosts(userId: number): Observable<Post[]> {
//     const userPosts = this.mockPosts.filter(post => post.user === userId); // Filter posts by user ID
//     console.log(`Mock posts fetched for user ${userId}:`, userPosts);
//     return of(userPosts); // Simulate fetching posts
//   }

//   createComment(comment: PostComment): Observable<PostComment> {
//     // Ensure the post ID exists in the mock storage
//     if (!this.mockComments[comment.post]) {
//       this.mockComments[comment.post] = [];
//     }

//     // Simulate adding a new comment with a mock ID and timestamp
//     const newComment = {
//       ...comment,
//       id: this.mockComments[comment.post].length + 1, // Generate a mock ID
//       created_at: new Date() // Add a timestamp
//     };

//     this.mockComments[comment.post].push(newComment); // Add the comment to the mock storage
//     console.log(`Mock comment added to post ${comment.post}:`, newComment);

//     return of(newComment); // Simulate a successful API response
//   }

//   // Mock method to fetch comments for a post
//   getComments(postId: number): Observable<PostComment[]> {
//     const comments = this.mockComments[postId] || []; // Return comments for the post or an empty array
//     console.log(`Mock comments fetched for post ${postId}:`, comments);
//     return of(comments); // Simulate a successful API response
//   }
}
