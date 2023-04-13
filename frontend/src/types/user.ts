export type Role = "Admin" | "Customer";
export interface User extends BaseUser {
  id: string;
  role: string;
  avatar: string;
  re_password: undefined;
  creationAt?: string;
  updatedAt?: string;
}

export interface BaseUser {
  name: string;
  email: string;
  password: string;
  re_password?: string;
  avatar: FileList | string;
}

export interface UserReducer {
  userList: User[];
  currentUser?: User;
  access_token?: string;
  isLoggedIn?: boolean;
  isAdmin?: boolean;
}

export interface Credentials {
  password: string;
  email: string;
}

export interface ReturnCredentials {
  token: string;
  expiration: Date;
}
