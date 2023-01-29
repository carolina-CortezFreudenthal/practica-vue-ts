import { computed } from "vue";
import { useStore } from "vuex";
import { User } from "../models/user";

const useAuth = () => {
  const store = useStore();

  return {
    // GETTERS
    user: computed<User>(() => store.getters["auth/getUser"]),
    authToken: computed<string>(() => store.getters["auth/getAuthToken"]),
    isLoggedIn: computed<boolean>(() => store.getters["auth/isLoggedIn"]),

    // ACTIONS
    login: (email: string, password: string) => store.dispatch("auth/login", { email, password }),
    verify: () => store.dispatch("auth/verify"),
    clearUser: () => store.dispatch("auth/clearUser"),
  };
};

export default useAuth;
