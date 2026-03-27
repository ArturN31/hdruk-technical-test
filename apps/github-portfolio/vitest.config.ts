import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '.'),
		},
	},
	test: {
		environment: 'jsdom',
		include: ['tests/**/*.test.{ts,tsx}'],
		setupFiles: ['tests/setup.ts'],
		coverage: {
			provider: 'v8',
			include: [
				'app/**/*.{ts,tsx}',
				'components/**/*.{ts,tsx}',
				'hooks/**/*.{ts,tsx}',
				'lib/**/*.{ts,tsx}',
			],
			exclude: [
				'node_modules/**',
				'tests/**',
				'**/*.d.ts',
				'**/*.test.{ts,tsx}',
				'**/layout.tsx',
				'**/loading.tsx',
				'**/error.tsx',
				'next.config.mjs',
				'postcss.config.js',
				'tailwind.config.ts',
				'**/WebVitals.tsx',
				'**/index.ts',
			],
			reporter: ['text', 'json', 'html'],
		},
	},
});
