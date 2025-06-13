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
import type { ButtonVariant } from '@/types/button'
import { ButtonVariantEnum } from '@/types/button'

const props = defineProps<{
  label: string
  variant?: ButtonVariant
}>()

defineEmits(['press'])

const styleClass = computed(() => {
  const variantClass = props.variant ?? ButtonVariantEnum.Primary
  return `${variantClass}`
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/_mixins.scss' as mixins;

.key-button {
  width: 100%;
  text-align: center;
  border-radius: var(--border-radius);
  padding: var(--spacing-xxs);
  transition:
    background-color var(--transition-basic),
    color var(--transition-basic),
    box-shadow var(--transition-basic);
  user-select: none;
  cursor: pointer;
  line-height: var(--line-height);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);

  @media (max-width: 560px) {
    font-size: var(--font-size-md);
  }
}

.primary {
  @include mixins.button-variant(var(--key-bg-primary), var(--key-shadow-primary), var(--text-btn-primary));
}

.secondary {
  @include mixins.button-variant(var(--key-bg-secondary), var(--key-shadow-secondary), var(--text-btn-secondary));
  font-size: var(--font-size-xxl);

  @media (max-width: 560px) {
    font-size: var(--font-size-xl);
  }
}

.accent {
  @include mixins.button-variant(var(--key-bg-accent), var(--key-shadow-accent), var(--text-btn-accent));
}
</style>
