import { Role } from "./role";

export interface User extends Auth {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  phoneNumber: string;
  imageUrl: string;
  about: string;
  registeredAt: string;
  updatedAt: string;
  roles: any[];
}

export interface Auth {
  email: string;
  password: string;
}
