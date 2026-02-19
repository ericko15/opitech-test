<script setup lang="ts">
import type { Product } from '@/types/product';
import ProductCard from '@/components/ui/ProductCard.vue';

defineProps<{
  products: Product[];
  loading: boolean;
}>();
</script>

<template>
  <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
    <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="h-48 w-full bg-gray-200"></div>
      <div class="p-4 space-y-3">
        <div class="h-5 w-3/4 bg-gray-200 rounded"></div>
        <div class="h-4 w-full bg-gray-200 rounded"></div>
        <div class="h-6 w-20 bg-gray-200 rounded mt-4"></div>
      </div>
    </div>
  </div>
  <div v-else-if="!products.length" class="text-center py-12 text-gray-500">
    No se encontraron productos
  </div>
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>
