import { User } from "../../models/user";

export interface IAuthState {
  user: User | null,
  authToken: string | null,
}

function state(): IAuthState {
  return {
    user: null,
    authToken: null,
  };
}

export default state;