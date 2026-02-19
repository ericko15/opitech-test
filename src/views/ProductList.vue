<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useProductsStore } from '../stores/products';
import { useProducts } from '../composables/useProducts';
import { useRoute, useRouter } from 'vue-router';
import SearchInput from '../components/ui/SearchInput.vue';
import CategorySelect from '../components/ui/CategorySelect.vue';
import ProductCard from '../components/ui/ProductCard.vue';
import PaginationNav from '../components/ui/PaginationNav.vue';
import ErrorBanner from '../components/ui/ErrorBanner.vue';

const store = useProductsStore();
const { fetchCategories, fetchProducts } = useProducts();
const route = useRoute();
const router = useRouter();

const page = computed(() => Number(route.query.page ?? 1));
const q = computed(() => String(route.query.q ?? ''));
const category = computed(() => {
  const cat = route.query.category;
  return typeof cat === 'string' ? cat : '';
});

const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

onMounted(async () => {
  await fetchCategories();
  await fetchProducts({ page: page.value, q: q.value, category: category.value });
});

function onSearch(value: string) {
  if (searchTimeout.value) clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    const query = { ...route.query } as Record<string, string>;
    if (value.trim()) {
      query.q = value;
    } else {
      delete query.q;
    }
    query.page = '1';
    router.replace({ query });
    fetchProducts({ page: 1, q: value, category: category.value });
  }, 400);
}

function onCategoryChange(value: string) {
  router.replace({ query: { ...route.query, category: value || undefined, page: 1 } });
  fetchProducts({ page: 1, q: q.value, category: value });
}

function goPage(p: number) {
  router.replace({ query: { ...route.query, page: p } });
  fetchProducts({ page: p, q: q.value, category: category.value });
}
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-6 space-y-6">
    <header class="space-y-4">
      <h2 class="text-2xl font-bold text-gray-800">Catálogo de Productos</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
        <SearchInput :model-value="q" @update:model-value="onSearch" />
        <CategorySelect
          :categories="store.categories"
          :model-value="category"
          @update:model-value="onCategoryChange"
        />
      </div>
    </header>

    <ErrorBanner :message="store.error" />
    <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="bg-white rounded-xl shadow-sm p-4 animate-pulse">
        <div class="h-48 w-full bg-gray-200 rounded-lg mb-4"></div>
        <div class="h-5 w-3/4 bg-gray-200 mb-2"></div>
        <div class="h-4 w-full bg-gray-200"></div>
      </div>
    </div>
    <div v-else-if="!store.products.length" class="text-center py-12 text-gray-500">
      No se encontraron productos
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="p in store.products" :key="p.id" :product="p" />
    </div>

    <footer v-if="store.totalPages > 1">
      <PaginationNav :page="store.page" :total-pages="store.totalPages" @change="goPage" />
    </footer>
  </section>
</template>

<style scoped></style>
