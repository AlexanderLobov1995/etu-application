import {Todo} from "../todo-area/interfaces";

export interface Role {
  name: string;
  value: number;
}

export interface Level {
  get: number;
  update: number;
  create: number;
  delete: number;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  rights: string[];
}

export interface UserResponse {
  jwtToken: string;
  user: User,
  response: {
    method: string;
    status: string;
  },
  todos: Todo[];
}

export interface AuthResponse {
  user: User;
  token: string;
}
