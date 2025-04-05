export interface PostComment {
    id?: number; 
    post: number; 
    user: number; 
    content: string; 
    created_at?: Date; 
  }