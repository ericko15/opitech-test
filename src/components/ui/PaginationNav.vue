<script setup lang="ts">
const props = defineProps<{ page: number; totalPages: number }>();
const emit = defineEmits<{ change: [page: number] }>();
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <button
      class="px-5 py-2 border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
      :disabled="props.page <= 1"
      @click="emit('change', props.page - 1)"
    >
      Anterior
    </button>
    <span class="px-3 text-gray-600 text-sm"
      >Página {{ props.page }} de {{ props.totalPages }}</span
    >
    <button
      class="px-5 py-2 border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
      :disabled="props.page >= props.totalPages"
      @click="emit('change', props.page + 1)"
    >
      Siguiente
    </button>
  </div>
</template>
