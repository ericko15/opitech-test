<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{ categories: string[]; modelValue?: string }>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const isOpen = ref(false);

const selectedLabel = computed(() => {
  if (!props.modelValue) return 'Todas las categorías';
  return props.modelValue;
});

function selectCategory(cat: string) {
  emit('update:modelValue', cat);
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
  <div class="relative" v-click-outside="closeDropdown">
    <label class="sr-only">Filtrar por categoría</label>
    <button
      type="button"
      class="w-full px-4 py-2.5 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white transition-colors cursor-pointer flex items-center justify-between min-w-[180px]"
      @click="toggleDropdown"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
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
          class="w-full px-4 py-2.5 text-left transition-colors capitalize"
          :class="{
            'bg-primary text-white': !props.modelValue,
            'hover:bg-primary/90 text-white': !props.modelValue,
            'text-gray-700 hover:bg-gray-100': props.modelValue,
          }"
          @click="selectCategory('')"
          role="option"
        >
          Todas las categorías
        </button>
      </li>
      <li v-for="category in props.categories" :key="category">
        <button
          type="button"
          class="w-full px-4 py-2.5 text-left transition-colors capitalize"
          :class="{
            'bg-primary text-white': props.modelValue === category,
            'hover:bg-primary/90 text-white': props.modelValue === category,
            'text-gray-700 hover:bg-gray-100': props.modelValue !== category,
          }"
          @click="selectCategory(category)"
          role="option"
        >
          {{ category }}
        </button>
      </li>
    </ul>
  </div>
</template>
