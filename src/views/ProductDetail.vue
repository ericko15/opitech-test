<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '../stores/products';
import { useProducts } from '../composables/useProducts';
import ErrorBanner from '../components/ui/ErrorBanner.vue';

const route = useRoute();
const store = useProductsStore();
const { fetchProduct } = useProducts();

const isValidId = computed(() => {
  const id = Number(route.params.id);
  return Number.isInteger(id) && id > 0;
});

onMounted(async () => {
  if (!isValidId.value) {
    store.error = 'Producto no encontrado';
    return;
  }
  const id = Number(route.params.id);
  await fetchProduct(id);
});
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-6 space-y-4">
    <router-link
      to="/"
      class="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center gap-1"
    >
      ← Volver al catálogo
    </router-link>
    <ErrorBanner v-if="store.error && !store.current" :message="store.error" />
    <div
      v-else-if="store.loading || !store.current"
      class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2"
    >
      <div class="w-full rounded-xl h-80 bg-gray-200 animate-pulse"></div>
      <div class="space-y-4">
        <div class="h-8 bg-gray-200 w-3/4 rounded animate-pulse"></div>
        <div class="h-5 bg-gray-200 w-full rounded animate-pulse"></div>
        <div class="h-5 bg-gray-200 w-2/3 rounded animate-pulse"></div>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
      <img
        :src="store.current.images?.[0] || store.current.thumbnail"
        class="w-full rounded-xl shadow-sm"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-800 mb-3">{{ store.current.title }}</h1>
        <p class="text-gray-600 mb-5">{{ store.current.description }}</p>
        <div class="bg-gray-50 rounded-xl p-4 space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-500">Precio</span>
            <span class="font-bold text-primary text-lg">${{ store.current.price }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Categoría</span>
            <span class="font-medium capitalize">{{ store.current.category }}</span>
          </div>
          <div v-if="store.current.brand" class="flex justify-between">
            <span class="text-gray-500">Marca</span>
            <span class="font-medium">{{ store.current.brand }}</span>
          </div>
          <div v-if="store.current.stock != null" class="flex justify-between">
            <span class="text-gray-500">Stock</span>
            <span class="font-medium">{{ store.current.stock }} unidades</span>
          </div>
          <div v-if="store.current.rating" class="flex justify-between">
            <span class="text-gray-500">Rating</span>
            <span class="font-medium">★ {{ store.current.rating }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
