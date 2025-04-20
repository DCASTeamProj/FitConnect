export interface User {
    id?: number; // Optional, if the user has an ID
    firstName: string;
    lastName: string;
    username: string;
    birthDate?: string; // Optional
    bio?: string; // Optional
    profile_picture?: string; // Optional
  }