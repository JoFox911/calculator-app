<template>
  <output class="display" role="status" aria-live="polite" :style="displayFontSize">
    {{ value }}
  </output>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true,
    default: '0'
  }
})

const displayFontSize = computed(() => {
  if (props.value.length > 10 && props.value.length <= 15) {
    return { fontSize: 'var(--font-size-xxl)' }
  } else if (props.value.length > 15) {
    return { fontSize: 'var(--font-size-xl)' }
  }
  return {}
})
</script>

<style scoped lang="scss">
.display {
  min-height: 80px;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  color: var(--text-primary);
  background-color: var(--bg-screen);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg) var(--spacing-md);
  transition:
    background-color var(--transition-basic),
    color var(--transition-basic);
  font-size: var(--font-size-xxxl);
  font-weight: var(--font-weight-bold);

  @media (max-width: 560px) {
    font-size: var(--font-size-xxl);
    padding: var(--spacing-sm) var(--spacing-md);
  }
}
</style>
