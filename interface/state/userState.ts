import { USER } from "../types/user";

export interface UserState {
  token: string | null;
  user: USER | null;
}