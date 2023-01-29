<template>
    <AuthenticatedLayout>
        
        <v-sheet class="d-flex flex-row mx-auto" width="70%">
            <v-sheet class="flex-grow-1 pr-4">            
                <v-text-field
                    label="Search"
                    v-model="searchTerm"
                    @keyup.enter.native="() => searchTerm.length >= 3 && search()"
                ></v-text-field>
            </v-sheet>
            <v-sheet>
                <v-btn @click="search" prepend-icon="mdi-magnify" :disabled="searchTerm.length < 3" class="mt-2">Search</v-btn>
            </v-sheet>
        </v-sheet>
    
        <v-container>
            <v-sheet v-if="loadingProducts">
                <v-row>
                    <v-col v-for="n in 3" :key="n" cols="12" md="4">
                        <ProductThumbnailLoading />
                    </v-col>
                </v-row>
            </v-sheet>

            <v-sheet v-else="loadingProducts">
                <v-sheet v-if="searchView">
                    <v-btn @click="backToAll">Back to all</v-btn>
                </v-sheet>

                <v-row>
                    <v-col v-for="product in products" :key="product.id" cols="12" md="4">
                        <ProductThumbnail :product="product"/>
                    </v-col>
                </v-row>

                <v-pagination
                    v-if="!searchView"
                    v-model="currPage"
                    :length="pagesCount" 
                ></v-pagination>
            </v-sheet>

            <v-sheet v-if="!loadingProducts && products.length == 0" class="mt-10">
                <v-card text="There are no products." class="text-center"></v-card>
            </v-sheet>
        </v-container>

    </AuthenticatedLayout>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import { defineComponent, onMounted, ref, watch } from "vue";
import fakeShopApi from "../api/fakeShopApi";
import AuthenticatedLayout from "../components/AuthenticatedLayout.vue";
import ProductThumbnail from "../components/ProductThumbnail.vue";
import ProductThumbnailLoading from "../components/ProductThumbnailLoading.vue";
import { Product } from "../models/product";

export default defineComponent({
    name: "Home",
    setup() {
        const products = ref<Product[]>([])
        const currPage = ref(1);
        const pagesCount = ref(1);
        const searchTerm = ref("");
        const searchView = ref(false);
        const loadingProducts = ref(true);

        const loadProducts = async () => {
            searchView.value = false;
            loadingProducts.value = true;
            try { 
                const apiProducts = (await fakeShopApi.get<unknown, AxiosResponse<Product[]>>(
                    "/products", { params: { offset: currPage.value - 1 , limit: 3 } }
                )).data;
                // This is a fixed value that we are not getting from the responses
                pagesCount.value = Math.ceil(200 / 3),
                products.value = apiProducts;
            } catch {
                products.value = [];
            }
            loadingProducts.value = false;
        }

        const search = async () => {
            searchView.value = true;
            loadingProducts.value = true;
            try { 
                const apiProducts = (await fakeShopApi.get<unknown, AxiosResponse<Product[]>>(
                    "/products", { params: { title: searchTerm.value } }
                )).data;
                pagesCount.value = 1,
                products.value = apiProducts;
            } catch {
                products.value = [];
            }
            loadingProducts.value = false;
        }

        // Load products as soon as we enter here
        watch(currPage, () => {
            loadProducts();
        }, { immediate: true })

        return {
            products,
            loadProducts,
            loadingProducts,
            backToAll: async() => {
                searchTerm.value = "";
                loadProducts();
            },
            currPage,
            searchTerm,
            pagesCount,
            search,
            searchView,
        };
    },
    components: { AuthenticatedLayout, ProductThumbnail, ProductThumbnailLoading }
});
</script>
  