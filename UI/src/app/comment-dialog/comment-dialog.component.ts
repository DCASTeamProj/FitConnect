import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostComment } from '../Models/comment.model';
import { Post } from '../Models/post.models';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { User } from '../Models/user.model'; 

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent {
  @Input() user: User | null = null; // stores current user object
  newComment: string = '';
  currentUserId: number | null = null; // stores current user ID


  constructor(
    @Inject(MAT_DIALOG_DATA) public post: Post,
    private dialogRef: MatDialogRef<CommentDialogComponent>,
    private postService: PostService,
    private userService: UserService
  ) {
    if (typeof post.user === 'number') {
    this.userService.getUserById(this.post.user as number).subscribe({
      next: (user) => {
        this.currentUserId = user.id ?? null;
      },
      error: (err) => console.error('Error fetching user:', err)
    });
  } else {
    console.error('Invalid user data:', post.user);
  }
  }


  addComment(): void {
    if (!this.newComment.trim()) return;

    if (!this.user || !this.user.id) {
      console.error('User is not logged in or user ID is missing');
      return;
    }

    const comment: PostComment = {
      post: this.post.id!,
      user: this.user.id, // current user ID 
      content: this.newComment
    };
    console.log('Creating comment:', comment); 

    this.postService.createComment(comment).subscribe({
      next: (createdComment: PostComment) => {
        this.post.comments = [...(this.post.comments || []), createdComment];
        this.newComment = ''; // Clear the input field
      },
      error: (err) => console.error('Error creating comment:', err)
    });
  }

  editComment(comment: PostComment): void {
    this.postService.editComment(comment).subscribe({
      next: (updatedComment: PostComment) => {
        const index = this.post.comments?.findIndex(c => c.id === updatedComment.id);
        if (index !== undefined && index !== -1) {
          this.post.comments![index] = updatedComment;
        }
      },
      error: (err) => console.error('Error editing comment:', err)
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
