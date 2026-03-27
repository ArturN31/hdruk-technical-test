import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { UserConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 3002,
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/setup.ts',
		css: true,
		include: ['src/**/*.test.{ts,tsx}'],
		exclude: ['node_modules/', 'dist/', 'coverage/'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.{ts,tsx}'],
			exclude: ['node_modules/', 'src/tests/', 'dist/', 'src/main.tsx'],
		},
	},
} as UserConfig);
