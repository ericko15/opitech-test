<script setup lang="ts">
import type { Product } from '@/types/product';
const props = defineProps<{ product: Product }>();
</script>

<template>
  <router-link
    :to="{ name: 'product-detail', params: { id: props.product.id } }"
    class="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
  >
    <img
      :src="props.product.thumbnail"
      :alt="props.product.title"
      class="h-48 w-full object-cover"
      width="300"
      height="192"
    />
    <div class="p-4">
      <h3 class="font-semibold text-gray-800 line-clamp-1 mb-1">{{ props.product.title }}</h3>
      <p class="text-sm text-gray-500 line-clamp-2 mb-3">{{ props.product.description }}</p>
      <div class="flex items-center justify-between">
        <span class="text-lg font-bold text-primary">${{ props.product.price }}</span>
      </div>
    </div>
  </router-link>
</template>
