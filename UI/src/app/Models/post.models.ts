export interface Post {
    id?: number; // Optional for new posts
    user: number; // User ID
    content: string; // Post text
    image?: string; // url of the image (optional)
    created_at?: Date; // date of creation (optional)
  }