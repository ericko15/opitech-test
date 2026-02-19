<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useProductsStore } from '../stores/products';
import { useProducts } from '../composables/useProducts';
import { useRoute, useRouter } from 'vue-router';
import ProductFilters from '../components/products/ProductFilters.vue';
import ProductGrid from '../components/products/ProductGrid.vue';
import PaginationNav from '../components/ui/PaginationNav.vue';
import ErrorBanner from '../components/ui/ErrorBanner.vue';

const store = useProductsStore();
const { fetchCategories, fetchProducts } = useProducts();
const route = useRoute();
const router = useRouter();

const page = computed(() => Number(route.query.page ?? 1));
const searchValue = computed(() => String(route.query.q ?? ''));
const categoryValue = computed(() => {
  const cat = route.query.category;
  return typeof cat === 'string' ? cat : '';
});

onMounted(async () => {
  await fetchCategories();
  await fetchProducts({ page: page.value, q: searchValue.value, category: categoryValue.value });
});

function updateRoute(options: { page?: number; q?: string; category?: string } = {}) {
  const query: Record<string, string> = { ...route.query } as Record<string, string>;
  if (options.page) query.page = String(options.page);
  if (options.q !== undefined) {
    if (options.q.trim()) query.q = options.q;
    else delete query.q;
  }
  if (options.category !== undefined) {
    if (options.category) query.category = options.category;
    else delete query.category;
  }
  router.replace({ query });
}

function onSearch(value: string) {
  updateRoute({ q: value, page: 1 });
  fetchProducts({ page: 1, q: value, category: categoryValue.value });
}

function onCategoryChange(value: string) {
  updateRoute({ category: value, page: 1 });
  fetchProducts({ page: 1, q: searchValue.value, category: value });
}

function onPageChange(newPage: number) {
  updateRoute({ page: newPage });
  fetchProducts({ page: newPage, q: searchValue.value, category: categoryValue.value });
}
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-6 space-y-6">
    <header class="space-y-4">
      <h2 class="text-2xl font-bold text-gray-800">Catálogo de Productos</h2>
      <ProductFilters
        :search-value="searchValue"
        :category-value="categoryValue"
        :categories="store.categories"
        @search="onSearch"
        @category-change="onCategoryChange"
      />
    </header>

    <ErrorBanner :message="store.error" />
    <ProductGrid :products="store.products" :loading="store.loading" />

    <footer v-if="store.totalPages > 1">
      <PaginationNav :page="store.page" :total-pages="store.totalPages" @change="onPageChange" />
    </footer>
  </section>
</template>
