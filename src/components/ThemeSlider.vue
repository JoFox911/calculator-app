<template>
  <div class="theme-slider-container">
    <span class="theme-slider-title">
      Theme
    </span>

    <div class="theme-slider">
      <div class="theme-labels">
        <span
          v-for="(theme, i) in availableThemes"
          :key="theme"
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
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: var(--spacing-md);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
}

.theme-slider-title {
  line-height: var(--theme-slider-track-height);
  text-transform: uppercase;
  transition: color var(--transition-basic);
}

.theme-slider {
  width: var(--theme-slider-width);
  display: flex;
  flex-direction: column;
}

.theme-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 calc(var(--theme-slider-thumb-radius) / 2);
}

/* style the input element with type "range" */
.theme-slider input[type="range"] {
  width: 100%;
  position: relative;
  background-color: transparent;
  appearance: none;
  border-radius: 999px;
  z-index: 0;
  display: block;
  outline: none;
  &:focus-visible {
    outline: 2px solid var(--key-bg-accent, var(--focus-ring-color));
    outline-offset: 2px;
  }
}

/* Track styles for all browsers */
.theme-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background-color: var(--bg-toggle-keypad);
  height: var(--theme-slider-track-height);
  border-radius: 999px;
  padding: 0 var(--theme-slider-padding-horizontal);
  transition: background-color var(--transition-basic);
}

.theme-slider input[type="range"]::-moz-range-track {
  appearance: none;
  background-color: var(--bg-toggle-keypad);
  height: var(--theme-slider-track-height);
  border-radius: 999px;
  padding: 0 var(--theme-slider-padding-horizontal);
  transition: background-color var(--transition-basic);
}

.theme-slider input[type="range"]::-ms-track {
  background: transparent;
  border-color: transparent;
  color: transparent;
  height: var(--theme-slider-track-height);
  border-radius: 999px;
  transition: background-color var(--transition-basic);
}

/* Fill for MS Edge/IE */
.theme-slider input[type="range"]::-ms-fill-lower {
  background-color: var(--bg-toggle-keypad);
  border-radius: 999px;
}
.theme-slider input[type="range"]::-ms-fill-upper {
  background-color: var(--bg-toggle-keypad);
  border-radius: 999px;
}

/* Thumb styles for all browsers */
.theme-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  width: var(--theme-slider-thumb-radius);
  height: var(--theme-slider-thumb-radius);
  margin-top: calc((var(--theme-slider-track-height) - var(--theme-slider-thumb-radius)) / 2);
  background-color: var(--key-bg-accent);
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
  transition: transform var(--transition-basic), background-color var(--transition-basic);
}

.theme-slider input[type="range"]::-moz-range-thumb {
  position: relative;
  width: var(--theme-slider-thumb-radius);
  height: var(--theme-slider-thumb-radius);
  margin-top: calc((var(--theme-slider-track-height) - var(--theme-slider-thumb-radius)) / 2);
  background-color: var(--key-bg-accent);
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
  transition: transform var(--transition-basic), background-color var(--transition-basic);
}

.theme-slider input[type="range"]::-ms-thumb {
  position: relative;
  width: var(--theme-slider-thumb-radius);
  height: var(--theme-slider-thumb-radius);
  margin-top: 0;
  background-color: var(--key-bg-accent);
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
  transition: transform var(--transition-basic), background-color var(--transition-basic);
}

// Extra styles for IE/Edge
.theme-slider input[type="range"]:focus::-ms-fill-lower {
  background-color: var(--bg-toggle-keypad);
}
.theme-slider input[type="range"]:focus::-ms-fill-upper {
  background-color: var(--bg-toggle-keypad);
}
</style>