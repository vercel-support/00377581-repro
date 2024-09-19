import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    entry: ['index.ts', 'node.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: false,
    clean: true,
    ...options
  }
})
