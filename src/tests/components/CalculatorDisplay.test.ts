import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Display from '@/components/CalculatorDisplay.vue' // Adjust the path if necessary

describe('CalculatorDisplay.vue', () => {

  // Test 1: Component renders correctly with a basic value
  it('renders correctly with a given value', () => {
    const wrapper = shallowMount(Display, {
      props: {
        value: '123.45'
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('output').text()).toBe('123.45')
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.attributes('aria-live')).toBe('polite')
  })

  // Test 2: Accessibility attributes are correctly applied
  it('has correct ARIA attributes for accessibility', () => {
    const wrapper = shallowMount(Display, {
      props: {
        value: '42'
      }
    })
    const outputElement = wrapper.find('output')
    expect(outputElement.attributes('role')).toBe('status')
    expect(outputElement.attributes('aria-live')).toBe('polite')
  })

  // Test 3: Dynamic font sizing for values > 10 and <= 15 characters
  it('applies font-size-xxl for values between 11 and 15 characters (inclusive)', async () => {
    const wrapper = shallowMount(Display, {
      props: {
        value: '12345678901' // 11 characters
      }
    })
    // Use .element.style.fontSize to check the inline style
    expect(wrapper.find('output').element.style.fontSize).toBe('var(--font-size-xxl)')

    await wrapper.setProps({ value: '123456789012345' }) // 15 characters
    expect(wrapper.find('output').element.style.fontSize).toBe('var(--font-size-xxl)')
  })

  // Test 4: Dynamic font sizing for values > 15 characters
  it('applies font-size-xl for values greater than 15 characters', async () => {
    const wrapper = shallowMount(Display, {
      props: {
        value: '1234567890123456' // 16 characters
      }
    })
    expect(wrapper.find('output').element.style.fontSize).toBe('var(--font-size-xl)')

    await wrapper.setProps({ value: 'ThisIsALongValueThatExceedsFifteenCharacters' })
    expect(wrapper.find('output').element.style.fontSize).toBe('var(--font-size-xl)')
  })

  // Test 5: Default font sizing for values <= 10 characters
  it('retains default font-size-xxxl for values up to 10 characters', async () => {
    const wrapper = shallowMount(Display, {
      props: {
        value: '12345' // 5 characters
      }
    })
    // When no specific style is applied, the inline style will be empty,
    // relying on the CSS class for its default font size.
    expect(wrapper.find('output').element.style.fontSize).toBe('')

    await wrapper.setProps({ value: '1234567890' }) // 10 characters
    expect(wrapper.find('output').element.style.fontSize).toBe('')
  })

  // Test 6: `word-break` and `overflow-wrap` styles are applied (checking computed styles is harder with shallowMount, but class presence can be checked)
  it('applies relevant CSS classes for styling', () => {
    const wrapper = shallowMount(Display, {
      props: {
        value: '123'
      }
    })
    expect(wrapper.find('output').classes()).toContain('display')
    // For `word-break` and `overflow-wrap`, you'd typically rely on visual inspection or
    // integration tests that render the full component, as shallowMount doesn't
    // fully render CSS. However, ensuring the class is there implies the styles are applied.
  })
})