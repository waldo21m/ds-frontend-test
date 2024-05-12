/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test/setup.ts',
		coverage: {
			all: true,
			provider: 'istanbul',
			reporter: ['text', 'text-summary', 'lcov', 'cobertura', 'json'],
			exclude: ['**/{index,main,vite-env.d}.{ts,cts,mts,tsx}'],
		},
	},
});
