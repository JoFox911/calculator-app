import { defineStore } from 'pinia'
import { selectableThemes, availableThemes } from '@/constants/themes'
import type { ThemeOption, ThemeName } from '@/constants/themes'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'system' as ThemeOption
  }),
  getters: {
    resolvedTheme(state): ThemeName {
      if (state.theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return state.theme
    }
  },
  actions: {
    setTheme(value: ThemeOption) {
      this.theme = value
      localStorage.setItem('theme', value)
      this.applyTheme()
    },
    applyTheme() {
      const html = document.documentElement
      html.classList.remove(...availableThemes)
      html.classList.add(this.resolvedTheme)
      html.classList.add('theme-set')
    },
    initTheme() {
      const saved = localStorage.getItem('theme') as ThemeOption
      this.theme = selectableThemes.includes(saved) ? saved : 'system'

      if (this.theme === 'system') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener?.('change', this.applyTheme)

        if (typeof mediaQuery.matches !== 'boolean') {
          this.theme = 'dark'
        }
      }

      this.applyTheme()
    }
  }
})
