import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'happy-dom',
		globals: false,
		include: ['tests/**/*.test.js']
	}
});
