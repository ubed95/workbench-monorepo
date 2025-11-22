import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['**/*.test.ts', '**/*.test.tsx']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'WorkbenchUI',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@mui/material',
        '@mui/material/*',
        '@emotion/react',
        '@emotion/styled',
        '@emotion/styled/*',
        '@emotion/react/*'
      ],
      output: {
        // ❌ REMOVE preserveModules completely for theme library
        // Only use it if you have multiple components to export
        //preserveModules: true,  // ✅ Now makes sense
        // preserveModulesRoot: 'src',
        exports: 'named',
        assetFileNames: 'assets/[name][extname]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mui/material': 'MaterialUI',
          '@emotion/react': 'emotionReact',
          '@emotion/styled': 'emotionStyled'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
});
