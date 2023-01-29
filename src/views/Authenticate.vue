<template>
    <v-container>
      <v-row no-gutters class="mt-15">
        <v-col cols="12" md="6" offset-md="3">
          <v-card  outlined tile>
            <v-card elevation="10" :loading="isLoading" class="pa-2">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Sign In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field
                      prepend-icon="mdi-account"
                      name="login"
                      label="Login"
                      type="text"
                      v-model="email"
                      @keyup.enter.native="doLogin"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      prepend-icon="mdi-lock"
                      name="password"
                      label="Password"
                      type="password"
                      v-model="password" 
                      @keyup.enter.native="doLogin"
                    ></v-text-field>
                </v-form>

                <v-alert color="red" type="error" v-if="error">{{ error }}</v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="doLogin" :disabled="isLoading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <AppFooter />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth";
import AppFooter from "../components/AppFooter.vue";


export default defineComponent({
  name: "Authenticate",
  setup() {
    const router = useRouter();

    const { login } = useAuth();
    const email = ref("");
    const password = ref("");
    const isLoading = ref(false);
    const error = ref("");

    const emailIsValid = () => {
      return /\S+@\S+\.\S+/.test(email.value)
    }

    const validate = () => {
      if (!emailIsValid() || !password.value) {
        error.value = "Invalid email or password.";
        return false;
      }
      return true;
    }

    return {
      email,
      password,
      error,
      isLoading,
      doLogin: async () => {
        error.value = "";
        const valid = validate();
        if (!valid) return;

        isLoading.value = true;
        const success = await login(email.value, password.value);
        isLoading.value = false;

        if (!success) error.value = "Incorrect password!";
        else router.push({ path: '/' })
      }
    };
  },
  components: { AppFooter }
});
</script>