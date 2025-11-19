import { fileURLToPath } from 'node:url'
import { defineConfig } from '@kiwi-tooling/eslint-config'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  typescript: {
    parserOptions: {
      tsconfigRootDir: __dirname,
    },
  },
})
