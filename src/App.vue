<script setup lang="ts">
import Calculator from './components/Calculator.vue';
import ThemeSlider from './components/ThemeSlider.vue';
import { useThemeStore } from '@/stores/themeStore.ts';

const themeStore = useThemeStore()
themeStore.initTheme()
</script>

<template>
  <header>
    <div class="wrapper">
      <ThemeSlider />
      <Calculator />
    </div>
  </header>

</template>