import { PostComment } from '../Models/comment.model';
import { User } from '../Models/user.model';

export interface Post {
    id?: number; 
    user: number | User; // User ID  number#
    content: string; // Post text
    image?: string; 
    created_at?: Date; // date of creation (optional)
    comments?: PostComment[];
  }