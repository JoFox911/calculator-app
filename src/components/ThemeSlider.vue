<template>
  <div class="custom-slider">
    <div class="theme-labels">
      <span
        v-for="(_, i) in availableThemes"
        :key="i"
        class="theme-label"
      >
        {{ i + 1 }}
      </span>
    </div>
    <input
      ref="slider"
      :value="index"
      @input="onInput"
      type="range"
      min="0"
      :max="availableThemes.length - 1"
      step="1"
      class="slider"
      aria-label="Select theme"
      :aria-valuetext="availableThemes[index]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore'
import { availableThemes } from '@/constants/themes'
import type { ThemeName } from '@/constants/themes'

const themeStore = useThemeStore()

const index = computed(() =>
  availableThemes.indexOf(themeStore.resolvedTheme as ThemeName)
)

function onInput(event: Event) {
  const value = Number((event.target as HTMLInputElement).value)
  themeStore.setTheme(availableThemes[value])
}
</script>

<style lang="scss" scoped>
.custom-slider {
  // --trackHeight: 0.5rem;
  // --thumbRadius: 1rem;
  --trackHeight: 24px;
  --thumbRadius: 17px;
  width: 64px;
}

/* style the input element with type "range" */
.custom-slider input[type="range"] {
  width: 100%;
  position: relative;
  appearance: none;
  background-color: var(--bg-toggle-keypad);
  transition: background-color 0.2s ease;
  border-radius: 999px;
  z-index: 0;
}



/* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */
.custom-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background-color: var(--bg-toggle-keypad);
  height: var(--trackHeight);
  border-radius: 999px;
  padding: 0 5px;
}


.custom-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
  background-color: var(--key-bg-accent);
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
  transition: transform 0.3s ease;
}

.theme-labels {
  display: flex;
  justify-content: space-between;
  height: 20px;
  margin: 0 13%;
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  font-size: 12px;
}
</style>
