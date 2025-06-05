import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import KeyButton from '@/components/KeyButton.vue'
import { ButtonVariantEnum } from '@/types/button'

describe('KeyButton', () => {
  // Test Case 1: Renders the label prop correctly
  it('should render the label prop correctly', () => {
    const wrapper = mount(KeyButton, {
      props: {
        label: 'Test Label'
      }
    })
    // We expect the text content of the component to include 'Test Label'
    expect(wrapper.text()).toContain('Test Label')
  })

  // Test Case 2: Applies 'primary' class by default
  it('should apply the "primary" class by default when no variant prop is provided', () => {
    const wrapper = mount(KeyButton, {
      props: {
        label: 'Default'
      }
    })
    // We expect the root element of the component to have the class `primary`
    expect(wrapper.classes()).toContain(ButtonVariantEnum.Primary)
  })

  // Test Case 3: Applies 'secondary' class when variant prop is 'secondary'
  it('should apply the "secondary" class when variant prop is "secondary"', () => {
    const wrapper = mount(KeyButton, {
      props: {
        label: 'Secondary Button',
        variant: ButtonVariantEnum.Secondary
      }
    })
    expect(wrapper.classes()).toContain(ButtonVariantEnum.Secondary)
    expect(wrapper.classes()).not.toContain(ButtonVariantEnum.Primary) // Ensure primary is not there
  })

  // Test Case 4: Applies 'accent' class when variant prop is 'accent'
  it('should apply the "accent" class when variant prop is "accent"', () => {
    const wrapper = mount(KeyButton, {
      props: {
        label: 'Accent Button',
        variant: ButtonVariantEnum.Accent
      }
    })
    expect(wrapper.classes()).toContain(ButtonVariantEnum.Accent)
    expect(wrapper.classes()).not.toContain(ButtonVariantEnum.Primary)
  })

  // Test Case 5: Emits 'press' event on click
  it('should emit a "press" event when clicked', async () => {
    const wrapper = mount(KeyButton, {
      props: {
        label: 'Click Me'
      }
    })
    // Simulate a click on the root element
    await wrapper.trigger('click')
    // Expect that the 'press' event was emitted
    expect(wrapper.emitted().press).toBeTruthy()
    // Optionally, expect that it was emitted exactly once
    expect(wrapper.emitted().press).toHaveLength(1)
  })

  // Test Case 6: Emits 'press' event on Enter keydown
  it('should emit a "press" event on Enter keydown', async () => {
    const wrapper = mount(KeyButton, {
      props: {
        label: 'Enter Key'
      }
    })
    // Simulate a keydown event for 'Enter'
    await wrapper.trigger('keydown.enter')
    expect(wrapper.emitted().press).toBeTruthy()
    expect(wrapper.emitted().press).toHaveLength(1)
  })

  // Test Case 7: Emits 'press' event on Space keydown
  it('should emit a "press" event on Space keydown', async () => {
    const wrapper = mount(KeyButton, {
      props: {
        label: 'Space Key'
      }
    })
    // Simulate a keydown event for 'Space'
    await wrapper.trigger('keydown.space')
    expect(wrapper.emitted().press).toBeTruthy()
    expect(wrapper.emitted().press).toHaveLength(1)
  })

  // Test Case 8: Has role="button" for accessibility
  it('should have role="button" for accessibility', () => {
    const wrapper = mount(KeyButton, {
      props: {
        label: 'Accessible Button'
      }
    })
    // Expect the root element to have the role attribute set to 'button'
    expect(wrapper.attributes('role')).toBe('button')
  })
})
