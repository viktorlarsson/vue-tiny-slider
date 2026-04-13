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
			// Keep vue and tiny-slider as runtime externals. tiny-slider must
			// not be inlined because it touches `document`/`window` at module
			// eval time — see SSR notes in README.
			external: ['vue', /^tiny-slider(\/|$)/],
			output: {
				globals: {
					vue: 'Vue',
					'tiny-slider': 'tns'
				}
			}
		},
		sourcemap: true
	}
});
