import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  target: 'es2015',
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
})
