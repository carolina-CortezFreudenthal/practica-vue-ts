<template>
    <!-- There is a rerender that happens before pushing the route.
    This will prevent the component from crashing -->
    <div v-if="user" class="d-flex flex-row mb-6">  
      <AppNavbar /> 

      <v-main>
        <v-container fluid>
          <slot />
        </v-container>
      </v-main>

      <AppFooter />
    </div>
  </template>
  
<script lang="ts">
  import { defineComponent } from "vue";
  import useAuth from "../composables/useAuth";
  import AppNavbar from "./AppNavbar.vue";
  import AppFooter from "./AppFooter.vue";
  
  export default defineComponent({
    name: "AuthenticationLayout",
    setup(props) {
        const { user } = useAuth();
        return {
            user,
        };
    },
    components: { AppNavbar, AppFooter }
});
</script>
    