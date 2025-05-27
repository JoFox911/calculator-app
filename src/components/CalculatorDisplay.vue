<template>
  <output class="display" role="status" aria-live="polite">
    {{ value }}
  </output>
</template>

<script setup lang="ts">
defineProps<{
  value: string
}>()
</script>

<style scoped>
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
  font-size: var(--text-display);
}
</style>
