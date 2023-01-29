<template>
    <AuthenticatedLayout>
        
        <v-sheet v-if="loading" >
            <v-layout align-center justify-center column fill-height>
                <v-flex row class="mx-auto">
                    <v-progress-circular indeterminate :size="128" :width="12" color="primary" class="mt-12"></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-sheet>
        <v-sheet v-else>
            <v-btn @click="goBack">Back to all</v-btn>    
            <v-card class="mx-auto my-12" width="80%">
            <v-carousel cover height="300">
                <v-carousel-item
                    v-for="pimage in product?.images"
                    :key="pimage"
                    :src="pimage"
                    cover
                ></v-carousel-item>
            </v-carousel>

                <v-card-item>
                <v-card-title>{{ product?.title }}</v-card-title>

                <v-card-subtitle>
                    <span class="me-1">{{ product?.price }} USD</span>
                </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-rating
                    :model-value="4.5"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                    ></v-rating>

                    <div class="text-grey ms-4">
                    4.5 (413)
                    </div>
                </v-row>
                <v-sheet class="mt-6">{{ product?.description }}</v-sheet>
                </v-card-text>

                <v-divider class="mx-4 mb-1"></v-divider>

                <v-card-title>Product Categories: </v-card-title>

                <div class="px-4">
                <v-chip-group>
                    <v-chip>{{ product?.category?.name }}</v-chip>
                </v-chip-group>
                </div>
            </v-card>
        </v-sheet>
    </AuthenticatedLayout>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import fakeShopApi from "../api/fakeShopApi";
import AuthenticatedLayout from "../components/AuthenticatedLayout.vue";
import { Product } from "../models/product";

export default defineComponent({
    name: "Home",
    props: {
        id: Number,
    },
    setup(props) {
        const router = useRouter();
        const product = ref<Product>();
        const loading = ref(true);

        const loadProduct = async () => {
            loading.value = true;
            try { 
                const apiProduct = (await fakeShopApi.get<unknown, AxiosResponse<Product>>(
                    `/products/${props.id}`
                )).data;
                product.value = apiProduct;
            } catch {
                router.push({ path: '/404' })
            }
            loading.value = false;
        }

        onMounted(() => {
            loadProduct();
        })

        return {
            loading,
            product,
            goBack: () => {
                router.back();
            },
        };
    },
    components: { AuthenticatedLayout }
});
</script>
  