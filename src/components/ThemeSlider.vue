<template>
  <div class="theme-slider-container">
    <label class="theme-slider-title">
      Theme
    </label>

    <div class="theme-slider">
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
        type="range"
        min="0"
        :max="availableThemes.length - 1"
        step="1"
        class="slider"
        aria-label="Select theme"
        :aria-valuetext="availableThemes[index]"
        @input="onInput"
      />
    </div>
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
.theme-slider-container {
  // --trackHeight: 0.5rem;
  // --thumbRadius: 1rem;
  --trackHeight: 24px;
  --thumbRadius: 17px;
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 30px;
  font-size: 12px;
  font-weight: var(--font-weight-bold);
}

.theme-slider-title {
  line-height: var(--trackHeight);
  text-transform: uppercase;
  transition:
    color var(--transition-basic);
}

.theme-slider {
  width: 64px;
}

/* style the input element with type "range" */
.theme-slider input[type="range"] {
  width: 100%;
  position: relative;
  appearance: none;
  background-color: var(--bg-toggle-keypad);
  transition:
    background-color var(--transition-basic);
  border-radius: 999px;
  z-index: 0;
  display: block;
}



/* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */
.theme-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background-color: var(--bg-toggle-keypad);
  height: var(--trackHeight);
  border-radius: 999px;
  padding: 0 5px;
  transition:
    background-color var(--transition-basic);
}


.theme-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
  background-color: var(--key-bg-accent);
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
  transition:
    transform var(--transition-basic),
    background-color var(--transition-basic);
}

.theme-labels {
  display: flex;
  justify-content: space-between;
  height: 20px;
  margin: 0 13%;
  transition:
    color var(--transition-basic);
}
</style>
