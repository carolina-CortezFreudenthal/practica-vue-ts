<template>
  <v-card
    @click="goToProduct"
    class="mx-auto my-12"
    max-width="374"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      cover
      height="250"
      :src="(product as Product).images[0]"
    ></v-img>

    <v-card-item>
      <v-card-title>{{ (product as Product).title }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ (product as Product).price }} USD</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div class="description">{{ (product as Product).description }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { defineComponent, onBeforeUpdate } from "vue";
import { useRouter } from "vue-router";
  import { Product } from "../models/product";

  export default defineComponent({
    name: "ProductThumbnail",
    props: {
      product: Object,
    },
    setup(props) {
      const router = useRouter();

      const goToProduct = () => {
        router.push(`products/${(props.product as Product).id}`)
      }

      return {
        goToProduct,
      }
    }
  });
</script>
    
<style scoped>
  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>