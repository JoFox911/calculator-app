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
import { onMounted, onUnmounted } from 'vue'
import KeyButton from '@/components/KeyButton.vue'
import type { ButtonVariant } from '@/types/button'
import { ButtonVariantEnum } from '@/types/button'

const emit = defineEmits<{
  (e: 'press', value: string): void
}>()

interface Key {
  label: string
  value: string
  variant: ButtonVariant
  class?: string
}

const keys: Key[] = [
  { label: '7', value: '7', variant: ButtonVariantEnum.Secondary }, { label: '8', value: '8', variant: ButtonVariantEnum.Secondary }, { label: '9', value: '9', variant: ButtonVariantEnum.Secondary }, { label: 'DEL', value: 'del', variant: ButtonVariantEnum.Primary },
  { label: '4', value: '4', variant: ButtonVariantEnum.Secondary }, { label: '5', value: '5', variant: ButtonVariantEnum.Secondary }, { label: '6', value: '6', variant: ButtonVariantEnum.Secondary }, { label: '+', value: '+', variant: ButtonVariantEnum.Secondary },
  { label: '1', value: '1', variant: ButtonVariantEnum.Secondary }, { label: '2', value: '2', variant: ButtonVariantEnum.Secondary }, { label: '3', value: '3', variant: ButtonVariantEnum.Secondary }, { label: '-', value: '-', variant: ButtonVariantEnum.Secondary },
  { label: '.', value: '.', variant: ButtonVariantEnum.Secondary }, { label: '0', value: '0', variant: ButtonVariantEnum.Secondary }, { label: '/', value: '/', variant: ButtonVariantEnum.Secondary }, { label: 'x', value: '*', variant: ButtonVariantEnum.Secondary },
  { label: 'RESET', value: 'reset', variant: ButtonVariantEnum.Primary, class: "wide" }, { label: '=', value: '=', variant: ButtonVariantEnum.Accent, class: "wide" }
]



const handleKeyDown = (event: KeyboardEvent) => {
  let pressedValue: string | undefined

  switch (event.key) {
    case '0': case '1': case '2': case '3': case '4':
    case '5': case '6': case '7': case '8': case '9':
    case '.': case '+': case '-': case '/':
      pressedValue = event.key
      break
    case '*': // For multiplication
    case 'x':
      pressedValue = '*'
      break
    case 'Backspace':
      pressedValue = 'del'
      break
    case 'Enter':
      pressedValue = '='
      break
  }

  if (pressedValue) {
    // Prevent default browser behavior for some keys (like space, enter in forms)
    event.preventDefault()
    emit('press', pressedValue)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
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

  @media (max-width: 560px) {
    gap: var(--spacing-xs);
    padding: var(--spacing-md);
  }
}
</style>