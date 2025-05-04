import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../Models/user.model';
import { PostService } from '../services/post.service';
import { Post } from '../Models/post.models';
import { PostComment } from '../Models/comment.model';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent implements OnChanges {
  @Input() user: User | null = null; // stores current user object

  newPost: string = '';
  newComment: string = '';
  posts: Post[] = [];
  selectedFile: File | null = null;
  mediaPreview: string | null = null;
  mediaType: 'image' | 'video' | null = null;

  constructor(private postService: PostService, private dialog: MatDialog, private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user && this.user.id) {
      this.loadUserPosts(); // Loads posts when user changes
    } 
  }

  loadUserPosts(): void {
    if (this.user && this.user.id) {
      this.postService.getUserPosts(this.user.id).subscribe({
        next: (data) => {
          // Fetch user details for each post
          this.posts = data.map(post => {
            post.comments = post.comments || [];
            if (typeof post.user === 'number') {
              // Fetch user details if post.user is a user ID
              this.userService.getUserById(post.user).subscribe(userDetails => {
                post.user = userDetails; // Replace user ID with full user details
              });
            }

            this.postService.getCommments(post.id!).subscribe({
              next: (comments) => {
                post.comments = comments; // attaches comments to post
              },
              error: (err) => console.error('Error fetching comments:', err)
            });

            return post;
          });
        },
        error: (error) => {
          console.error('Error fetching user posts:', error);
        }
      });
    }
  }

  // Handles file selection and updates preview
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.selectedFile = file;
      this.mediaType = file.type.startsWith('image/') ? 'image' : 'video';

      // Generate a preview
      const reader = new FileReader();
      reader.onload = () => {
        this.mediaPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  getUsername(post: Post): string {
    if (typeof post.user === 'object' && post.user.username) {
      return post.user.username;
    }
    return 'Unknown User';
  }

  getProfilePicture(post: Post): string {
    if (typeof post.user === 'object' && post.user.profile_picture) {
      return post.user.profile_picture;
    }
    return 'assets/images/profilePic.jpg'; 
  }

  // Add post dynamically
  addPost(): void {
    if (!this.newPost.trim()) return;

    if (!this.user || !this.user.id) {
      console.error('User is not selected or invalid');
      return;
    }

    const formData = new FormData();
    formData.append('user', this.user.id.toString());
    formData.append('content', this.newPost);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.postService.createPost(formData).subscribe({
      next: (createdPost: Post) => {
        this.posts.unshift(createdPost); // Add the new post to the top of the list
        this.newPost = ''; // Clear the input field
        this.selectedFile = null;
        this.mediaPreview = null; 
        this.mediaType = null; 
      },
      error: (err) => console.error('Error creating post:', err)
    });
  }

  showCommentDialog(post: Post): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: post
    });
    dialogRef.componentInstance.user = this.user;
  }

  // Resets the form fields
  resetForm(): void {
    this.newPost = '';
    this.selectedFile = null;
    this.mediaPreview = null;
  }
  
}