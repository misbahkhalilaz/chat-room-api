export interface LoginCredentials {
  userName: string;
  password: string;
}

export interface RegisterUser extends LoginCredentials {
  firstName: string;
  lastName: string;
}

export interface UserData {
  userName: string;
  firstName: string;
  lastName: string;
  isOnline: boolean;
}

export interface AuthResponse {
  user: UserData;
  token: string;
}
