import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ThemeSlider from '@/components/ThemeSlider.vue'
import { useThemeStore } from '@/stores/themeStore'
import { createPinia, setActivePinia } from 'pinia'
import type { ThemeName } from '@/constants/themes'
import { availableThemes } from '@/constants/themes'

// Mock the themeStore module.
// This ensures that when useThemeStore() is called in the component,
// it receives a mock function.
vi.mock('@/stores/themeStore', () => {
  return {
    useThemeStore: vi.fn(), // Here we create a mock function
  }
})

// Declare a variable that will hold the mock function
let mockedUseThemeStore: any

describe('ThemeSlider.vue', () => {
  // Type themeStoreMock for better type safety.
  // resolvedTheme will change, and setTheme is a mock function.
  let themeStoreMock: {
    resolvedTheme: ThemeName
    setTheme: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    setActivePinia(createPinia()) // Initialize Pinia for tests

    // Assign the imported `useThemeStore` (which is a mock)
    // to our explicitly typed variable `mockedUseThemeStore`.
    mockedUseThemeStore = useThemeStore

    // Set up our fake store object.
    themeStoreMock = {
      resolvedTheme: availableThemes[0], // Initial state: 'dark'

      // When setTheme is called, we update resolvedTheme within the mock itself.
      setTheme: vi.fn((theme: ThemeName) => {
        themeStoreMock.resolvedTheme = theme // Update mock state
      }),
    }

    // Configure the `useThemeStore` mock function to return our `themeStoreMock`.
    mockedUseThemeStore.mockReturnValue(themeStoreMock)
  })


  // ## Test 1: Component renders correctly
  it('renders the component correctly', () => {
    const wrapper = shallowMount(ThemeSlider)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.theme-slider-title').text()).toBe('Theme')
    expect(wrapper.find('.theme-slider').exists()).toBe(true)
    expect(wrapper.find('input[type="range"]').exists()).toBe(true)
  })

  // ## Test 2: Displays the correct number of theme labels
  it('displays the correct number of theme labels with dynamic text', () => {
    const wrapper = shallowMount(ThemeSlider)
    const labels = wrapper.findAll('.theme-label')

    // Expect the number of labels to be equal to the number of available themes
    expect(labels.length).toBe(availableThemes.length)

    // Iterate over availableThemes to dynamically check each label's text
    // Assuming your component renders the theme name or a derived value as the label text.
    // labels are meant to display 1, 2, 3 as indices.
    availableThemes.forEach((_, index) => {
       expect(labels[index].text()).toBe((index + 1).toString())
    })
  })



  // ## Test 3: Slider initializes with the correct value
  it('initializes the slider value based on the current theme', async () => {
    // Set the initial theme to "light" (availableThemes[1])
    // We can change `resolvedTheme` directly before mounting
    themeStoreMock.resolvedTheme = availableThemes[1]

    const wrapper = shallowMount(ThemeSlider)
    const slider = wrapper.find('input[type="range"]')

    const sliderHtmlElement = slider.element as HTMLInputElement

    // Check that the slider value matches the index of "light" (1)
    expect(Number(sliderHtmlElement.value)).toBe(1)
  })


  // ## Test 4: Changing the slider updates the theme in the store
  it('updates the theme in the store when slider value changes', async () => {
    const wrapper = shallowMount(ThemeSlider)
    const slider = wrapper.find('input[type="range"]')

    // Simulate changing the slider value to 2 (for the third theme - 'violet')
    // This will call the component's `onInput`, which will call `themeStore.setTheme(availableThemes[2])`.
    // Our `setTheme` mock will update `themeStoreMock.resolvedTheme` to `availableThemes[2]`.
    await slider.setValue(2)

    // Verify that `setTheme` was called once with the correct theme
    expect(themeStoreMock.setTheme).toHaveBeenCalledTimes(1)
    expect(themeStoreMock.setTheme).toHaveBeenCalledWith(availableThemes[2]) // availableThemes[2] = "violet"
  })
})