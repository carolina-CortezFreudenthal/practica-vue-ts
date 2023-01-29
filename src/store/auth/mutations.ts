import { MutationTree } from "vuex";
import { User } from "../../models/user";
import state, { IAuthState } from "./state";

const mutations: MutationTree<IAuthState> = {
  setUser(state: IAuthState, user: User) {
    state.user = user;
  },

  clearUser(state) {
    state.user = null;
    state.authToken = null;
  },

  setToken(state: IAuthState, value: string) {
    state.authToken = value;
  },
};

export default mutations;