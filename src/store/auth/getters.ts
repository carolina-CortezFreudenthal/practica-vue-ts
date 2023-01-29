import { GetterTree } from "vuex";
import state, { IAuthState } from "./state";

const getters: GetterTree<IAuthState, undefined> = {
  getUser(state) {
    return state.user;
  },
  getAuthToken(state) {
    return state.authToken;
  },
};

export default getters;