<template>
    <div>
      <v-app-bar color="deep-purple accent-4" dense dark>  
        <v-toolbar-title>Fake Store</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <router-link :to="{name: 'home'}"><v-icon>mdi-store-plus</v-icon></router-link>
        </v-btn>
  
        <v-btn icon>
          <router-link :to="{name: 'account'}"><v-icon>mdi-account</v-icon></router-link>
        </v-btn>
  
        <v-menu left bottom class="ml-2">
          <template v-slot:activator="{ props }">
            {{  user.name }}
            <v-btn icon v-bind="props">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
  
          <v-list>
            <v-list-item @click="clearUser">
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent, onBeforeUpdate } from "vue";
  import { useRouter } from "vue-router";
  import useAuth from "../composables/useAuth";
  
  export default defineComponent({
    name: "AppNavbar",
    setup(props) {
        const router = useRouter();
        const { user, clearUser } = useAuth();
        return {
            user,
            clearUser: () => {
                clearUser();
                router.push({ name: "login" });
            },
        };
    },
  });
  </script>
    