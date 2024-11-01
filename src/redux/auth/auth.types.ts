export interface User {
   username: string;
    email?: string;
    password: string;
  }

  export interface Credentials {
    username: string;
    password: string;
  }
  
  export interface UserState {
    user: User | null;
    isLoggedIn: boolean;
  }
  