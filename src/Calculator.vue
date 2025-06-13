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
import { all, create } from 'mathjs'
import type { ConfigOptions } from 'mathjs'

// Configure math.js to use BigNumber for precise calculations
const config: ConfigOptions = {
  number: 'BigNumber', // Default type of number: 'number' (default), 'BigNumber', or 'Fraction'
  precision: 64 // Number of significant digits for BigNumbers
}
const math = create(all, config) // Create a mathjs instance with BigNumber support

const expression = ref('')
const displayValue = ref('0')

function handleKeyPress(key: string) {
  // console.log(`Key pressed: ${key}`)

  switch (key) {
    case 'del':
      expression.value = expression.value.slice(0, -1)
      // Ensure display is '0' if expression becomes empty
      displayValue.value = expression.value || '0'
      break

    case 'reset':
      expression.value = ''
      displayValue.value = '0'
      break

    case '=':
      try {
        if (expression.value.trim() === '') {
          displayValue.value = '0'
          expression.value = ''
          return
        }

        let result = math.evaluate(expression.value)

        if (!isFinite(result) || isNaN(result)) {
          displayValue.value = 'Error'
          expression.value = ''
          return
        }

        result = math.format(result, { notation: 'auto', precision: 5 })

        displayValue.value = String(result)
        expression.value = String(result)
      } catch (err) {
        console.error("Calculation error:", err)
        displayValue.value = 'Error'
        expression.value = ''
      }
      break

    default:
      // Prevent multiple leading zeros unless part of a decimal
      if (expression.value === '0' && key !== '.') {
          expression.value = key
      } else {
          expression.value += key
      }
      displayValue.value = expression.value // Always show current expression
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