import { Component, Input } from '@angular/core';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent {
  @Input() user: any;

  newPost: string = '';
  posts: Array<{ text: string; mediaUrl?: string; mediaType?: 'image' | 'video' }> = [];
  selectedFile: File | null = null;
  mediaPreview: string | null = null; // Stores preview URL
  mediaType: 'image' | 'video' | null = null;

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
    if (!this.newPost.trim() && !this.selectedFile) return; // Prevents empty posts

    const newPostData: { text: string; mediaUrl?: string; mediaType?: 'image' | 'video' } = {
      text: this.newPost,
      mediaUrl: this.mediaPreview ?? undefined, // Uses previewed media
      mediaType: this.mediaType ?? undefined
    };

    this.posts.unshift(newPostData); // Add post to top of list
    this.resetForm();
  }

  // Resets the form fields
  resetForm(): void {
    this.newPost = '';
    this.selectedFile = null;
    this.mediaPreview = null;
    this.mediaType = null;
  }
}