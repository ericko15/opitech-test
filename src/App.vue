<script setup lang="ts"></script>

<template>
  <main class="min-h-dvh bg-gray-50 font-sans">
    <nav class="bg-white shadow-sm border-b border-gray-100">
      <div class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <router-link to="/" class="flex items-center">
          <img
            src="https://www.opitech.com.co/assets/layout/logo-light.png"
            alt="OpiTech"
            class="h-8"
          />
        </router-link>
      </div>
    </nav>
    <router-view />
  </main>
</template>

<style scoped></style>
