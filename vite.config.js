import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.js'),
			name: 'vue-tiny-slider',
			fileName: () => 'index.js',
			formats: ['umd']
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: { vue: 'Vue' }
			}
		},
		sourcemap: true
	}
});
