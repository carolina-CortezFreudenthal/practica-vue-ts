<template>
    <v-card
      loading
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
  
      <div class="img-skeleton"></div>

      <v-card-item>
        <div class="card-title mb-1"></div>
        <div class="card-subtitle mb-1"></div>
      </v-card-item>
  
      <v-card-text>
        <div class="card-description mb-1"></div>
      </v-card-text>
    </v-card>
</template>
  
<script lang="ts">
    import { defineComponent, onBeforeUpdate } from "vue";    
    export default defineComponent({
      name: "ProductThumbnailLoading",
    });
</script>
      
<style scoped>
    .img-skeleton {
        width: 100%;
        background-color: #ddd;
        height: 250px;
    }

    .card-title {
        background-color: #ddd;
        height: 20px;
        border-radius: 5px;
        width: 60%;
    }

    .card-subtitle {
        background-color: #ddd;
        height: 15px;
        border-radius: 5px;
        width: 30%;
    }

    .card-description {
        background-color: #ddd;
        height: 60px;
        border-radius: 5px;
        width: 100%;
    }
</style>