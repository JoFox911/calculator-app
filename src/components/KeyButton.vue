<template>
  <div
    class="key-button"
    :class="styleClass"
    role="button"
    @click="$emit('press')"
    @keydown.enter.space="$emit('press')"
  >
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  variant?: 'primary' | 'secondary' | 'accent'
}>()

defineEmits(['press'])

const styleClass = computed(() => {
  const map = {
    primary: 'primary',
    secondary: 'secondary',
    accent: 'accent'
  }
  return map[props.variant ?? 'primary']
})
</script>

<style scoped lang="scss">
.key-button {
  width: 100%;
  text-align: center;
  border-radius: var(--border-radius);
  padding: var(--spacing-xs);
  transition:
    background-color var(--transition-basic),
    color var(--transition-basic),
    box-shadow var(--transition-basic);
  user-select: none;
  cursor: pointer;
  line-height: 50px; /* Adjust as needed */
}

.primary {
  background-color: var(--key-bg-primary);
  box-shadow: inset 0 -4px var(--key-shadow-primary);
  color: var(--text-btn-primary);
  font-size: var(--text-body);
}

.secondary {
  background-color: var(--key-bg-secondary);
  box-shadow: inset 0 -4px var(--key-shadow-secondary);
  color: var(--text-btn-secondary);
  font-size: var(--text-numbers);
  font-weight: var(--font-weight-bold);
}

.accent {
  background-color: var(--key-bg-accent);
  box-shadow: inset 0 -4px var(--key-shadow-accent, var(--key-shadow-secondary));
  color: var(--text-btn-accent);
  font-size: var(--text-body);
}
</style>
