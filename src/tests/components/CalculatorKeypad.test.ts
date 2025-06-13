import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Keypad from '@/components/CalculatorKeypad.vue'
import KeyButton from '@/components/KeyButton.vue'

// Mock the KeyButton component to avoid shallowMounting its internals
// and focus purely on Keypad's behavior and props passing.
vi.mock('@/components/KeyButton.vue', () => ({
  // Define a simple mock for KeyButton that just renders a slot
  // and emits a 'press' event when clicked.
  default: {
    // We need to define props that KeyButton expects
    props: ['label', 'variant', 'class'],
    template: '<button @click="$emit(\'press\', value)">{{ label }}</button>'
  }
}))

describe('CalculatorKeypad.vue', () => {
  // Test 1: Component renders correctly and contains KeyButton components
  it('renders the correct number of KeyButton components', () => {
    const wrapper = shallowMount(Keypad)
    // There are 18 keys in your `keys` array
    expect(wrapper.findAllComponents(KeyButton).length).toBe(18)
  })

  // Test 2: Each KeyButton receives correct props
  it('passes correct props to each KeyButton', () => {
    const wrapper = shallowMount(Keypad)
    const keyButtons = wrapper.findAllComponents(KeyButton)

    // Check a few specific buttons to ensure props are passed correctly
    // Example: first button '7'
    expect(keyButtons[0].props('label')).toBe('7')
    expect(keyButtons[0].props('variant')).toBe('secondary')

    // Example: 'DEL' button
    expect(keyButtons[3].props('label')).toBe('DEL')
    expect(keyButtons[3].props('variant')).toBe('primary')

    // Example: 'RESET' button (with class "wide")
    expect(keyButtons[16].props('label')).toBe('RESET')
    expect(keyButtons[16].props('variant')).toBe('primary')
    expect(keyButtons[16].classes()).toContain('wide') // Check the class is applied
  })

  // Test 3: Emits 'press' event with correct value when a KeyButton emits 'press'
  it('emits "press" event with the correct value when a KeyButton emits "press"', async () => {
    const wrapper = shallowMount(Keypad);
    const firstButton = wrapper.findAllComponents(KeyButton)[0]; // The '7' button

    // This simulates the KeyButton component internally emitting its 'press' event.
    await firstButton.vm.$emit('press', '7'); // Simulate KeyButton emitting 'press' with value '7'

    // Check that the 'press' event was emitted by Keypad
    expect(wrapper.emitted('press')).toBeTruthy();
    // Check the payload of the emitted event, which Keypad derived from `key.value`
    expect(wrapper.emitted('press')?.[0]).toEqual(['7']);

    const resetButton = wrapper.findAllComponents(KeyButton).find(b => b.props('label') === 'RESET');
    // Simulate resetButton emitting 'press' with value 'reset'
    await resetButton?.vm.$emit('press', 'reset');
    // Keypad always emits `key.value`, so we assert on `reset`
    expect(wrapper.emitted('press')?.at(-1)).toEqual(['reset']);
  });

  // --- Keyboard Event Handling Tests ---

  // Before each test, mock window.addEventListener and window.removeEventListener
  beforeEach(() => {
    vi.spyOn(window, 'addEventListener')
    vi.spyOn(window, 'removeEventListener')
  })

  // After each test, restore the original functions
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // Test 4: `keydown` listener is added on mount
  it('adds a keydown event listener to the window on mount', () => {
    shallowMount(Keypad)
    expect(window.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function))
  })

  // Test 5: `keydown` listener is removed on unmount
  it('removes the keydown event listener from the window on unmount', () => {
    const wrapper = shallowMount(Keypad)
    const listenerFunction = (window.addEventListener as any).mock.calls[0][1]
    wrapper.unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith('keydown', listenerFunction)
  })

  // Test 6: Emits 'press' event for number key presses
  it('emits "press" event for number key presses', () => {
    const wrapper = shallowMount(Keypad)

    // Simulate a keydown event for '5'
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }))
    expect(wrapper.emitted('press')).toBeTruthy()
    expect(wrapper.emitted('press')?.[0]).toEqual(['5'])

    // Simulate another keydown for '0'
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }))
    expect(wrapper.emitted('press')?.at(-1)).toEqual(['0'])
  })

  // Test 7: Emits 'press' event for operator key presses (+, -, /, .)
  it('emits "press" event for operator key presses', () => {
    const wrapper = shallowMount(Keypad)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: '+' }))
    expect(wrapper.emitted('press')?.at(-1)).toEqual(['+'])

    window.dispatchEvent(new KeyboardEvent('keydown', { key: '-' }))
    expect(wrapper.emitted('press')?.at(-1)).toEqual(['-'])

    window.dispatchEvent(new KeyboardEvent('keydown', { key: '/' }))
    expect(wrapper.emitted('press')?.at(-1)).toEqual(['/'])

    window.dispatchEvent(new KeyboardEvent('keydown', { key: '.' }))
    expect(wrapper.emitted('press')?.at(-1)).toEqual(['.'])
  })

  // Test 8: Emits 'press' event for '*' (multiplication) and 'x' key presses
  it('emits "press" event for multiplication key presses (* or x)', () => {
    const wrapper = shallowMount(Keypad)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: '*' }))
    expect(wrapper.emitted('press')?.at(-1)).toEqual(['*'])

    // Simulate 'x' key press (common for multiplication)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x' }))
    expect(wrapper.emitted('press')?.at(-1)).toEqual(['*'])
  })

  // Test 9: Emits 'press' event for 'Backspace' key (mapped to 'del')
  it('emits "press" event for Backspace key (mapped to "del")', () => {
    const wrapper = shallowMount(Keypad)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }))
    expect(wrapper.emitted('press')).toBeTruthy()
    expect(wrapper.emitted('press')?.[0]).toEqual(['del'])
  })

  // Test 10: Emits 'press' event for 'Enter' key (mapped to '=')
  it('emits "press" event for Enter key (mapped to "=")', () => {
    const wrapper = shallowMount(Keypad)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(wrapper.emitted('press')).toBeTruthy()
    expect(wrapper.emitted('press')?.[0]).toEqual(['='])
  })

  // Test 11: Does not emit 'press' for unhandled key presses
  it('does not emit "press" for unhandled key presses', () => {
    const wrapper = shallowMount(Keypad)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Control' }))

    expect(wrapper.emitted('press')).toBeFalsy() // Should not have emitted anything
  })

  // Test 12: `event.preventDefault()` is called for handled keys
  it('calls event.preventDefault() for handled key presses', () => {
    const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    const preventDefaultSpy = vi.spyOn(mockEvent, 'preventDefault')

    // Manually trigger the event on the window
    window.dispatchEvent(mockEvent)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  // Test 13: `event.preventDefault()` is NOT called for unhandled keys
  it('does NOT call event.preventDefault() for unhandled key presses', () => {
    const mockEvent = new KeyboardEvent('keydown', { key: 'UnkonwnKey' })
    const preventDefaultSpy = vi.spyOn(mockEvent, 'preventDefault')

    window.dispatchEvent(mockEvent)

    expect(preventDefaultSpy).not.toHaveBeenCalled()
  })
})