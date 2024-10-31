export interface User {
    id: string;
    username: string;
    email: string;
  }

  export interface Credentials {
    username: string;
    password: string;
  }
  
  export interface UserState {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;
  }
  