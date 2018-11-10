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
  firstname: string;
  lastname: string;
  role: string;
  rights: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
}
