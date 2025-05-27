<template>
  <div class="calculator">
    <CalculatorDisplay :value="displayValue" />

    <CalculatorKeypad @press="handleKeyPress" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CalculatorDisplay from './components/CalculatorDisplay.vue'
import CalculatorKeypad from './components/CalculatorKeypad.vue'

const expression = ref('')
const displayValue = ref('0')

function handleKeyPress(key: string) {
  console.log(`Key pressed: ${key}`)
  switch (key) {
    case 'del':
      // Handle delete logic
      expression.value = expression.value.slice(0, -1)
      displayValue.value = expression.value || '0'
      break;
    case 'reset':
      expression.value = ''
      displayValue.value = '0'
      break;
    case '=':
      // Handle calculation logic
      try {
        // ❗️Safe only for simple expressions (numbers and operators only)
        const sanitized = expression.value.replace(/[^-()\d/*+.]/g, '')
        const result = Function(`return (${sanitized})`)()
        displayValue.value = String(result.toFixed(4))
        expression.value = String(result)
      } catch (err) {
        displayValue.value = 'Error'
      }
      break;
    default:
      // Append the key to the display value
      expression.value += key
      displayValue.value = expression.value
  }
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
