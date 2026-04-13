import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';

// Capture the mock so each test can inspect/drive it.
const tnsMock = vi.fn();

vi.mock('tiny-slider/src/tiny-slider', () => ({
	tns: (...args) => tnsMock(...args)
}));

import VueTinySlider from '../src/index.js';

function makeFakeSlider(overrides = {}) {
	return {
		events: { on: vi.fn() },
		goTo: vi.fn(),
		rebuild: vi.fn(function () { return this; }),
		getInfo: vi.fn(() => ({ index: 0 })),
		destroy: vi.fn(),
		...overrides
	};
}

// init() is async (lazy-imports tiny-slider), so after mount we flush
// microtasks before assertions that depend on the slider being ready.
async function mountSlider(props = {}, slots = undefined) {
	const wrapper = mount(VueTinySlider, {
		props,
		slots: slots ?? {
			default: '<div class="s">A</div><div class="s">B</div>'
		}
	});
	await flushPromises();
	return wrapper;
}

beforeEach(() => {
	tnsMock.mockReset();
	tnsMock.mockImplementation(() => makeFakeSlider());
});

describe('VueTinySlider', () => {
	it('renders default slot children into a <div>', async () => {
		const wrapper = await mountSlider();
		expect(wrapper.element.tagName).toBe('DIV');
		expect(wrapper.findAll('.s')).toHaveLength(2);
	});

	it('calls tns() on mount when autoInit is true (default)', async () => {
		await mountSlider();
		expect(tnsMock).toHaveBeenCalledTimes(1);
	});

	it('does NOT call tns() on mount when autoInit is false', async () => {
		await mountSlider({ autoInit: false });
		expect(tnsMock).not.toHaveBeenCalled();
	});

	it('passes the component root element as container', async () => {
		const wrapper = await mountSlider();
		const settings = tnsMock.mock.calls[0][0];
		expect(settings.container).toBe(wrapper.element);
	});

	it('forwards key props to tns(), coercing items to int', async () => {
		await mountSlider({ items: '3', mode: 'gallery', loop: false, mouseDrag: true });
		const settings = tnsMock.mock.calls[0][0];
		expect(settings.items).toBe(3);
		expect(settings.mode).toBe('gallery');
		expect(settings.loop).toBe(false);
		expect(settings.mouseDrag).toBe(true);
	});

	it('fixedWidth passes through as false when falsy, or parsed int when set', async () => {
		await mountSlider();
		expect(tnsMock.mock.calls[0][0].fixedWidth).toBe(false);

		tnsMock.mockClear();
		await mountSlider({ fixedWidth: '250' });
		expect(tnsMock.mock.calls[0][0].fixedWidth).toBe(250);
	});

	it('strips undefined props before calling tns()', async () => {
		// `axis` has no default, so it will be undefined unless set.
		await mountSlider();
		const settings = tnsMock.mock.calls[0][0];
		expect('axis' in settings).toBe(false);
	});

	it('emits init after tns() is created', async () => {
		const wrapper = await mountSlider();
		expect(wrapper.emitted('init')).toBeTruthy();
		expect(wrapper.emitted('init')).toHaveLength(1);
	});

	it('subscribes to every tiny-slider event in eventsList and re-emits them', async () => {
		const fake = makeFakeSlider();
		tnsMock.mockImplementationOnce(() => fake);
		const wrapper = await mountSlider();

		const expected = VueTinySlider.eventsList;
		expect(fake.events.on).toHaveBeenCalledTimes(expected.length);
		const subscribedNames = fake.events.on.mock.calls.map(c => c[0]);
		expect(subscribedNames).toEqual(expected);

		// Simulate tiny-slider firing indexChanged; component should $emit it.
		const indexChangedHandler = fake.events.on.mock.calls.find(
			c => c[0] === 'indexChanged'
		)[1];
		indexChangedHandler({ index: 4 });
		expect(wrapper.emitted('indexChanged')).toBeTruthy();
		expect(wrapper.emitted('indexChanged')[0]).toEqual([{ index: 4 }]);
	});

	it('goTo(value) delegates to the underlying slider', async () => {
		const fake = makeFakeSlider();
		tnsMock.mockImplementationOnce(() => fake);
		const wrapper = await mountSlider();
		wrapper.vm.goTo(2);
		expect(fake.goTo).toHaveBeenCalledWith(2);
	});

	it('rebuild() replaces slider and emits rebuild', async () => {
		const fake = makeFakeSlider();
		tnsMock.mockImplementationOnce(() => fake);
		const wrapper = await mountSlider();
		wrapper.vm.rebuild();
		expect(fake.rebuild).toHaveBeenCalled();
		expect(wrapper.emitted('rebuild')).toBeTruthy();
	});

	it('getInfo() emits getInfo with payload and slider', async () => {
		const info = { index: 7 };
		const fake = makeFakeSlider({ getInfo: vi.fn(() => info) });
		tnsMock.mockImplementationOnce(() => fake);
		const wrapper = await mountSlider();
		wrapper.vm.getInfo();
		const emitted = wrapper.emitted('getInfo');
		expect(emitted).toBeTruthy();
		expect(emitted[0][0]).toBe(info);
		expect(emitted[0][1]).toBe(fake);
	});

	it('destroy() calls slider.destroy', async () => {
		const fake = makeFakeSlider();
		tnsMock.mockImplementationOnce(() => fake);
		const wrapper = await mountSlider();
		wrapper.vm.destroy();
		expect(fake.destroy).toHaveBeenCalled();
	});

	it('destroys the slider when the component is unmounted', async () => {
		const fake = makeFakeSlider();
		tnsMock.mockImplementationOnce(() => fake);
		const wrapper = await mountSlider();
		wrapper.unmount();
		expect(fake.destroy).toHaveBeenCalled();
	});

	it('controlsText default is [prev, next]', async () => {
		await mountSlider();
		expect(tnsMock.mock.calls[0][0].controlsText).toEqual(['prev', 'next']);
	});
});
