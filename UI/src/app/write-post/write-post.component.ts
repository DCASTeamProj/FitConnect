import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../Models/user.model';
import { PostService } from '../services/post.service';
import { Post } from '../Models/post.models';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent {
  @Input() user: any;

  newPost: string = '';
  posts: Post[] = [];
  selectedFile: File | null = null;
  mediaPreview: string | null = null;
  mediaType: 'image' | 'video' | null = null;

  constructor(private postService: PostService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.loadUserPosts(); // Loads posts when user changes
    } 
  }

  loadUserPosts(): void {
    if (this.user) {
      const userId = (this.user as { id: number }).id; // Type assertion for user ID
      this.postService.getUserPosts(userId).subscribe({
        next: (data) => {
          this.posts = data.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime());
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

  // Add post dynamically
  addPost(): void {
    if (!this.newPost.trim()) return;

    const newPost: Post = {
      user: this.user!.id,
      content: this.newPost,
      image: this.mediaPreview || undefined
    };

    this.postService.createPost(newPost).subscribe({
      next: (createdPost: Post) => {
        this.posts.unshift(createdPost); // Add the new post to the top of the list
        this.resetForm();
      },
      error: (err: any) => console.error('Error creating post:', err)
    });
  }

  // Resets the form fields
  resetForm(): void {
    this.newPost = '';
    this.selectedFile = null;
    this.mediaPreview = null;
    
  }
}