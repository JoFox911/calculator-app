<script setup lang="ts">
import Calculator from './Calculator.vue'
import ThemeSlider from './components/ThemeSlider.vue'
import { useThemeStore } from '@/stores/themeStore.ts'

const themeStore = useThemeStore()
themeStore.initTheme()
</script>

<template>
  <div class="app">
    <header>
      <div class="app-header">
        <h1 class="app-title">calc</h1>
        <ThemeSlider />
      </div>
    </header>

    <main>
      <Calculator />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px; // todo
  margin: auto;
  max-width: 570px;
  min-height: 100vh;
  gap: var(--spacing-lg);
}

header, main {
  width: 100%;
  display: flex;
  justify-content: center;
}

.app-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  color: var(--text-primary);
}

.app-title {
  font-size: var(--text-logo);
  line-height: var(--text-numbers);
  transition:
    color var(--transition-basic);
}
</style>