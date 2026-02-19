<script setup lang="ts">
const props = defineProps<{ message: string }>();
</script>

<template>
  <div
    v-if="props.message"
    role="alert"
    aria-live="polite"
    class="p-4 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm"
  >
    {{ props.message }}
  </div>
</template>
