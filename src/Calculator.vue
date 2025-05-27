<template>
  <div class="calculator">
    <CalculatorDisplay :value="displayValue" />

    <CalculatorKeypad @key-press="handleKeyPress" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CalculatorDisplay from './components/CalculatorDisplay.vue'
import CalculatorKeypad from './components/CalculatorKeypad.vue'

const displayValue = ref('399,981')

function handleKeyPress(key: string) {

}
</script>

<style scoped>
.calculator {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>
