import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfigFn from './vite.config'

// Call the Vite configuration function to get the configuration object.
// Pass a mock `ConfigEnv` object for 'test' mode.
const viteConfigResolved = viteConfigFn({ mode: 'test', command: 'serve' })


export default mergeConfig(
  viteConfigResolved,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
