<template>
   <AuthenticatedLayout>
      <v-card text="Not Found" class="text-center"></v-card>
   </AuthenticatedLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthenticatedLayout from "../components/AuthenticatedLayout.vue";

export default defineComponent({
   name: "Authenticate",
   components: { AuthenticatedLayout }
 });
 </script>