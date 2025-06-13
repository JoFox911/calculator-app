import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Calculator from '@/Calculator.vue'
import CalculatorDisplay from '@/components/CalculatorDisplay.vue'
import CalculatorKeypad from '@/components/CalculatorKeypad.vue'

// Mock the child components to isolate the Calculator's logic
vi.mock('@/components/CalculatorDisplay.vue', () => ({
  default: {
    props: ['value'],
    template: '<div class="mock-display">{{ value }}</div>', // Simple mock for display
  },
}))

vi.mock('@/components/CalculatorKeypad.vue', () => ({
  default: {
    template: '<button class="mock-keypad-button" @click="$emit(\'press\', \'mock-key\')"></button>', // Simple mock for keypad
  },
}))

describe('Calculator.vue', () => {
  let wrapper: ReturnType<typeof shallowMount>

  // Before each test, mount the component and reset mocks
  beforeEach(() => {
    wrapper = shallowMount(Calculator)
  })

  // Helper function to simulate a key press by emitting from the mocked keypad
  const pressKey = async (key: string) => {
    const keypad = wrapper.findComponent(CalculatorKeypad)
    await keypad.vm.$emit('press', key)
  }

  // Helper to get the display value
  const getDisplayValue = () => {
    return wrapper.findComponent(CalculatorDisplay).props('value')
  }

  // --- Initial State Tests ---
  it('displays "0" initially', () => {
    expect(getDisplayValue()).toBe('0')
  })

  // --- Number Input Tests ---
  it('updates display when number keys are pressed', async () => {
    await pressKey('1')
    expect(getDisplayValue()).toBe('1')
    await pressKey('2')
    expect(getDisplayValue()).toBe('12')
  })

  it('replaces initial "0" when a number key is pressed (not for decimals)', async () => {
    expect(getDisplayValue()).toBe('0')
    await pressKey('5')
    expect(getDisplayValue()).toBe('5')
    await pressKey('0') // Should append '0'
    expect(getDisplayValue()).toBe('50')
  })

  it('allows leading "0" for decimals', async () => {
    await pressKey('0')
    await pressKey('.')
    expect(getDisplayValue()).toBe('0.')
    await pressKey('5')
    expect(getDisplayValue()).toBe('0.5')
  })

  // --- Operator Input Tests ---
  it('appends operators to the expression', async () => {
    await pressKey('1')
    await pressKey('+')
    expect(getDisplayValue()).toBe('1+')
    await pressKey('2')
    expect(getDisplayValue()).toBe('1+2')
  })

  // --- DEL (Delete) Logic Tests ---
  it('deletes the last character from the expression', async () => {
    await pressKey('1')
    await pressKey('2')
    await pressKey('3')
    expect(getDisplayValue()).toBe('123')

    await pressKey('del')
    expect(getDisplayValue()).toBe('12')
  })

  it('resets display to "0" if expression becomes empty after delete', async () => {
    await pressKey('5')
    expect(getDisplayValue()).toBe('5')

    await pressKey('del')
    expect(getDisplayValue()).toBe('0') // Should be '0'
  })

  // --- RESET Logic Tests ---
  it('resets the display and expression to "0" and empty string respectively', async () => {
    await pressKey('1')
    await pressKey('+')
    await pressKey('2')
    expect(getDisplayValue()).toBe('1+2')

    await pressKey('reset')
    expect(getDisplayValue()).toBe('0')
    // Internal expression ref is not directly accessible from shallowMount,
    // but the display value returning to '0' implies it reset.
    // If you need to test internal ref directly, consider a full mount
    // or expose it for testing (less ideal).
  })

  // --- Calculation (=) Logic Tests ---
  it('performs basic addition correctly with precise formatting', async () => {
    await pressKey('0')
    await pressKey('.')
    await pressKey('1')
    await pressKey('+')
    await pressKey('0')
    await pressKey('.')
    await pressKey('2')
    await pressKey('=')
    // Using precision 5, 0.30000000000000004 should become 0.3
    expect(getDisplayValue()).toBe('0.3')
  })

  it('performs mixed operations respecting precedence and formats correctly', async () => {
    await pressKey('2')
    await pressKey('+')
    await pressKey('3')
    await pressKey('*')
    await pressKey('4')
    await pressKey('=')
    expect(getDisplayValue()).toBe('14') // 2 + (3 * 4) = 14
  })

  it('handles division correctly and formats decimal results', async () => {
    await pressKey('1')
    await pressKey('/')
    await pressKey('3')
    await pressKey('=')
    // With precision 5, 1/3 is 0.33333
    expect(getDisplayValue()).toBe('0.33333')
  })

  it('handles division by zero and displays "Error"', async () => {
    await pressKey('5')
    await pressKey('/')
    await pressKey('0')
    await pressKey('=')
    expect(getDisplayValue()).toBe('Error')
  })

  it('clears expression after an error', async () => {
    await pressKey('5')
    await pressKey('/')
    await pressKey('0')
    await pressKey('=') // This causes an error
    expect(getDisplayValue()).toBe('Error')

    // After error, inputting a new number should start a new expression
    await pressKey('1')
    expect(getDisplayValue()).toBe('1')
  })

  it('handles empty expression on "=" press', async () => {
    await pressKey('=')
    expect(getDisplayValue()).toBe('0')
    // Ensure it does not try to evaluate an empty string
  })
})