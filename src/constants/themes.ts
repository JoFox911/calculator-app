export const availableThemes = ['dark', 'light', 'violet'] as const

export const selectableThemes = [...availableThemes, 'system'] as const

export type ThemeName = typeof availableThemes[number]

export type ThemeOption = typeof selectableThemes[number]