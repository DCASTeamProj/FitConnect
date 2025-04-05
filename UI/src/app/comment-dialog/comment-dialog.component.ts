import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostComment } from '../Models/comment.model';
import { Post } from '../Models/post.models';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent {
  newComment: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public post: Post,
    private dialogRef: MatDialogRef<CommentDialogComponent>,
    private postService: PostService
  ) {}

  addComment(): void {
    if (!this.newComment.trim()) return;

    const comment: PostComment = {
      post: this.post.id!,
      user: 1, // Replace with actual user ID
      content: this.newComment
    };

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
