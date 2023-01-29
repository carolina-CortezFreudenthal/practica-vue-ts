<template>
  <v-app>
    <div v-if="!verifying"><router-view /></div>
    <div v-else>
      <v-layout align-center justify-center column fill-height>
          <v-flex row class="mx-auto">
              <v-progress-circular indeterminate :size="128" :width="12" color="primary" class="mt-12"></v-progress-circular>
          </v-flex>
      </v-layout>
    </div>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import useAuth from "./composables/useAuth";

export default defineComponent({
  name: "App",
  setup() {
    const verifying = ref(true);
    const { verify, clearUser, authToken } = useAuth();
    watch(authToken, () => {
      verifying.value = true;
      // when we change the authtoken, we need to verify again
      const perform = async () => {
        const success = await verify();
        if (!success) clearUser();
        verifying.value = false;
      };
      if (authToken) perform();
    }, { immediate: true })
    return { verifying, authToken }
  },
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
