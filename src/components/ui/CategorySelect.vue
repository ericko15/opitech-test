<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{ categories: string[] }>();
const modelValue = defineModel<string>({ default: '' });

const currentValue = computed(() => modelValue.value ?? '');

const isOpen = ref(false);

const selectedLabel = computed(() => {
  if (!currentValue.value) return 'Todas las categorías';
  return currentValue.value;
});

function selectCategory(category: string) {
  modelValue.value = category;
  isOpen.value = false;
}

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}
</script>

<template>
  <div v-click-outside="closeDropdown" class="relative">
    <label class="sr-only">Filtrar por categoría</label>
    <button
      type="button"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      class="w-full px-4 py-2.5 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white transition-colors cursor-pointer flex items-center justify-between min-w-[180px]"
      @click="toggleDropdown"
    >
      <span class="truncate">{{ selectedLabel }}</span>
      <svg
        class="w-4 h-4 ml-2 text-gray-400 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <ul
      v-if="isOpen"
      class="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto"
      role="listbox"
    >
      <li>
        <button
          type="button"
          role="option"
          class="w-full px-4 py-2.5 text-left transition-colors capitalize"
          :class="{
            'bg-primary text-white': !currentValue,
            'hover:bg-primary/90 text-white': !currentValue,
            'text-gray-700 hover:bg-gray-100': currentValue,
          }"
          @click="selectCategory('')"
        >
          Todas las categorías
        </button>
      </li>
      <li v-for="category in props.categories" :key="category">
        <button
          type="button"
          role="option"
          class="w-full px-4 py-2.5 text-left transition-colors capitalize"
          :class="{
            'bg-primary text-white': currentValue === category,
            'hover:bg-primary/90 text-white': currentValue === category,
            'text-gray-700 hover:bg-gray-100': currentValue !== category,
          }"
          @click="selectCategory(category)"
        >
          {{ category }}
        </button>
      </li>
    </ul>
  </div>
</template>
