<script setup lang="ts">
const modelValue = defineModel<string>({ default: '' });
</script>

<template>
  <label class="sr-only" for="search-input">Buscar productos</label>
  <input
    id="search-input"
    class="px-4 py-2.5 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary w-full transition-colors"
    type="text"
    placeholder="Buscar…"
    :value="modelValue"
    @input="modelValue = ($event.target as HTMLInputElement).value"
  />
</template>
