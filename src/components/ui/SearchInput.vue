<script setup lang="ts">
const props = defineProps<{ modelValue: string; placeholder?: string }>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}
</script>

<template>
  <label class="sr-only" for="search-input">Buscar productos</label>
  <input
    id="search-input"
    class="px-4 py-2.5 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary w-full transition-colors"
    type="text"
    placeholder="Buscar…"
    :value="props.modelValue"
    @input="onInput"
  />
</template>
