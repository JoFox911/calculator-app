<template>
  <div class="keypad">
    <KeyButton
      v-for="(key, i) in keys"
      :key="key.value"
      :label="key.label"
      :variant="key.variant"
      :class="key.class ?? ''"
      :tabindex="i"
      @press="$emit('press', key.value)"
    />
  </div>
</template>

<script setup lang="ts">
import KeyButton from '@/components/KeyButton.vue'

type KeyVariant = 'secondary' | 'primary' | 'accent';
interface Key {
  label: string;
  value: string;
  variant: KeyVariant;
  class?: string;
}

const keys: Key[] = [
  { label: '7', value: '7', variant: 'secondary' }, { label: '8', value: '8', variant: 'secondary' }, { label: '9', value: '9', variant: 'secondary' }, { label: 'DEL', value: 'del', variant: 'primary' },
  { label: '4', value: '4', variant: 'secondary' }, { label: '5', value: '5', variant: 'secondary' }, { label: '6', value: '6', variant: 'secondary' }, { label: '+', value: '+', variant: 'secondary' },
  { label: '1', value: '1', variant: 'secondary' }, { label: '2', value: '2', variant: 'secondary' }, { label: '3', value: '3', variant: 'secondary' }, { label: '-', value: '-', variant: 'secondary' },
  { label: '.', value: '.', variant: 'secondary' }, { label: '0', value: '0', variant: 'secondary' }, { label: '/', value: '/', variant: 'secondary' }, { label: 'x', value: '*', variant: 'secondary' },
  { label: 'RESET', value: 'reset', variant: 'primary', class: "wide" }, { label: '=', value: '=', variant: 'accent', class: "wide" }
]
</script>

<style scoped lang="scss">
.keypad {
  background-color: var(--bg-toggle-keypad);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  transition:
    background-color var(--transition-basic);

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, auto);
  gap: var(--spacing-md);

  .wide {
    grid-column: span 2;
  }
}
</style>