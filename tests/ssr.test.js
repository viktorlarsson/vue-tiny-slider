// @vitest-environment node
// Regression guard: importing the component in a pure Node context
// (no window, no document, no DOM globals) must NOT throw. This catches
// top-level browser references leaking back into the module eval path.
import { describe, it, expect } from 'vitest';

describe('SSR safety', () => {
	it('component module can be imported in Node without DOM globals', async () => {
		const mod = await import('../src/index.js');
		expect(mod.default).toBeTypeOf('object');
		expect(mod.default.props).toBeTypeOf('object');
	});

	it('does not reference window/document at module-eval time', async () => {
		// Assert absence of the browser globals before import — proving
		// the happy-dom env isn't leaking into this test.
		expect(typeof window).toBe('undefined');
		expect(typeof document).toBe('undefined');
		// Re-import is a no-op (cached), but keeps the assertion meaningful.
		await import('../src/index.js');
	});
});
