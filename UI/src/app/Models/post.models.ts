import { PostComment } from '../Models/comment.model';

export interface Post {
    id?: number; 
    user: number; // User ID
    content: string; // Post text
    image?: string; 
    created_at?: Date; // date of creation (optional)
    comments?: PostComment[];
  }