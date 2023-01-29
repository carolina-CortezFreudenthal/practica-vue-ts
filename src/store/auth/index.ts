import { Module } from "vuex";
import state, { IAuthState } from "./state";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

const userModule: Module<IAuthState, undefined> = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

export default userModule;