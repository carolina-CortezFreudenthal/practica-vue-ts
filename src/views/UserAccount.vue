<template>
    <AuthenticatedLayout>
        <v-container>
            <v-row no-gutters class="mt-5">
                <v-col cols="12" md="6" offset-md="3">
                <v-card  outlined tile>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>{{ user.name }} ({{ user.email }})</v-toolbar-title>
                    </v-toolbar>
                    <v-card elevation="10" class="pa-2">
                        <v-img
                            :lazy-src="user.avatar"
                            max-width="100%"
                            :src="user.avatar"
                        ></v-img>

                        <v-card-text class="mt-2">
                            <p><strong>Creation at:</strong> {{ creationAt }}</p>
                            <p><strong>Updated at:</strong> {{ updatedAt }}</p>
                            <p><strong>Role:</strong> {{ user.role }}</p>
                        </v-card-text>
                    
                    </v-card>
                </v-card>
                </v-col>
            </v-row>
        </v-container>
    </AuthenticatedLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthenticatedLayout from "../components/AuthenticatedLayout.vue";
import useAuth from "../composables/useAuth";

export default defineComponent({
    name: "Home",
    setup() {
        const { user } = useAuth();
        return {
            user,
            creationAt: new Date(user.value.creationAt).toDateString(),
            updatedAt: new Date(user.value.updatedAt).toDateString(),
        };
    },
    components: { AuthenticatedLayout }
});
</script>
  