<script setup lang="ts">
const props = defineProps<{ categories: string[]; modelValue?: string }>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLSelectElement).value);
}
</script>

<template>
  <label class="sr-only" for="category-select">Filtrar por categoría</label>
  <select
    id="category-select"
    class="px-4 py-2.5 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white transition-colors cursor-pointer"
    :value="props.modelValue || ''"
    @change="onChange"
  >
    <option value="">Todas las categorías</option>
    <option v-for="c in props.categories" :key="c" :value="c">{{ c }}</option>
  </select>
</template>
