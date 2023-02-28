import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      {
        find: '@assets',
        replacement: path.resolve('./src/assets')
      },
      {
        find: '@domain',
        replacement: path.resolve('./src/domain')
      },
      {
        find: '@presentation',
        replacement: path.resolve('./src/presentation')
      },
      {
        find: '@services',
        replacement: path.resolve('./src/services')
      }
    ]
  }
})
