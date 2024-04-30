import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({mode}) => ({
	plugins: [
		svelte(),
		tsconfigPaths()
	],
	test: {
		environment: 'jsdom',
		alias: [{
			find: /^svelte$/,
			replacement: 'svelte/internal'
		}]
	}
}));
