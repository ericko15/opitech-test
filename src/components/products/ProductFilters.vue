<script setup lang="ts">
import { ref, watch } from 'vue';
import SearchInput from '../ui/SearchInput.vue';
import CategorySelect from '../ui/CategorySelect.vue';

const props = defineProps<{
  searchValue: string;
  categoryValue: string;
  categories: string[];
}>();

const emit = defineEmits<{
  'update:searchValue': [value: string];
  'update:categoryValue': [value: string];
  search: [value: string];
  categoryChange: [value: string];
}>();

const searchInput = ref(props.searchValue);
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

watch(
  () => props.searchValue,
  (newVal) => {
    searchInput.value = newVal;
  },
);

function onSearchInput(value: string) {
  searchInput.value = value;
  if (searchTimeout.value) clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    emit('update:searchValue', value);
    emit('search', value);
  }, 400);
}

function onCategoryChange(value: string) {
  emit('update:categoryValue', value);
  emit('categoryChange', value);
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
    <SearchInput v-model="searchInput" @update:model-value="onSearchInput" />
    <CategorySelect
      :categories="props.categories"
      :model-value="props.categoryValue"
      @update:model-value="onCategoryChange"
    />
  </div>
</template>
