<script setup lang="ts">
const props = defineProps<{ page: number; totalPages: number }>();
const emit = defineEmits<{ change: [page: number] }>();
</script>

<template>
  <nav class="flex flex-wrap items-center justify-center gap-2">
    <button
      v-if="props.totalPages > 2"
      class="px-3 py-2 border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
      :disabled="props.page <= 1"
      @click="emit('change', 1)"
    >
      <span class="hidden sm:inline">« Primera</span>
      <span class="sm:hidden">«</span>
    </button>
    <button
      class="px-4 sm:px-5 py-2 border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
      :disabled="props.page <= 1"
      @click="emit('change', props.page - 1)"
    >
      <span class="hidden sm:inline">Anterior</span>
      <span class="sm:hidden">‹</span>
    </button>
    <span class="px-3 text-gray-600 text-sm">{{ props.page }} / {{ props.totalPages }}</span>
    <button
      class="px-4 sm:px-5 py-2 border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
      :disabled="props.page >= props.totalPages"
      @click="emit('change', props.page + 1)"
    >
      <span class="hidden sm:inline">Siguiente</span>
      <span class="sm:hidden">›</span>
    </button>
    <button
      v-if="props.totalPages > 2"
      class="px-3 py-2 border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
      :disabled="props.page >= props.totalPages"
      @click="emit('change', props.totalPages)"
    >
      <span class="hidden sm:inline">Última »</span>
      <span class="sm:hidden">»</span>
    </button>
  </nav>
</template>
