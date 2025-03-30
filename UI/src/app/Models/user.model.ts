export interface User {
    id?: string; // Optional, if the user has an ID
    firstName: string;
    lastName: string;
    username: string;
    birthDate?: string; // Optional
    bio?: string; // Optional
    profilePicture?: string; // Optional
  }