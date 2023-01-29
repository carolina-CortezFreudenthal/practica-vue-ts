import fakeShopApi from "../../api/fakeShopApi";
import { User } from "../../models/user";
import { AxiosResponse } from "axios";
import { ActionTree } from "vuex";
import { IAuthState } from "./state";

const actions: ActionTree<IAuthState, undefined> = {
  // Method for login
  async login({ commit }, { email, password } ) {
    try {
      const tokenData = (await fakeShopApi.post<unknown, AxiosResponse<{ access_token: string }>>(
        "auth/login", { email, password }
      )).data;

      // Store token in local storage and vuex
      const authToken = tokenData.access_token;
      localStorage.setItem("auth-token", authToken);
      commit("setToken", authToken);
    } catch {
      return false;
    }
    return true;
  },
  // Method to verify if user is logged in
  async verify({ commit }) {
    const authToken = localStorage.getItem("auth-token");

    if (!authToken) return false;
    commit("setToken", authToken);
  
    try {
      // Fetch user data
      const profileData = (await fakeShopApi.get<unknown, AxiosResponse<User>>(
        "auth/profile"
      )).data;
      commit("setUser", profileData);
    } catch {
      return false;
    }
   return true;
  },
  // Clear user data (used in log out)
  async clearUser({ commit }) {
    localStorage.setItem("auth-token", "");
    commit("clearUser");
  }
};

export default actions;