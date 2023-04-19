import { v4 as uuidv4 } from "uuid";

export interface IUser {
  user_id: string;
  login: string;
  password: string;
  validatePassword: (password: string) => boolean;
  getNewToken: () => string;
  validateToken: (token: string) => boolean;
  logout: (token: string) => void;
  isLoggedIn: () => boolean;
}

export default class User implements IUser {
  user_id: string;
  login: string;
  password: string;
  private tokens: string[] = [];
  constructor(user_id: string, login: string, password: string) {
    this.user_id = user_id;
    this.login = login;
    this.password = password;
  }

  validatePassword = (password: string): boolean => {
    return this.password === password;
  };
  getNewToken = (): string => {
    const token = uuidv4();
    this.tokens.push(token);
    return token;
  };
  validateToken = (token: string): boolean => {
    return this.tokens.includes(token);
  };
  logout = (token: string): void => {
    this.tokens = this.tokens.filter((t) => t !== token);
  };
  isLoggedIn = (): boolean => {
    return !!this.tokens.length;
  };
}
