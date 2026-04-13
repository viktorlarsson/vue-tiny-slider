import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

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

function mountSlider(props = {}, slots = undefined) {
	return mount(VueTinySlider, {
		props,
		slots: slots ?? {
			default: '<div class="s">A</div><div class="s">B</div>'
		}
	});
}

beforeEach(() => {
	tnsMock.mockReset();
	tnsMock.mockImplementation(() => makeFakeSlider());
});

describe('VueTinySlider — Vue 2 baseline', () => {
	it('renders default slot children into a <div>', () => {
		const wrapper = mountSlider();
		expect(wrapper.element.tagName).toBe('DIV');
		expect(wrapper.findAll('.s')).toHaveLength(2);
	});

	it('calls tns() on mount when autoInit is true (default)', () => {
		mountSlider();
		expect(tnsMock).toHaveBeenCalledTimes(1);
	});

	it('does NOT call tns() on mount when autoInit is false', () => {
		mountSlider({ autoInit: false });
		expect(tnsMock).not.toHaveBeenCalled();
	});

	it('passes the component root element as container', () => {
		const wrapper = mountSlider();
		const settings = tnsMock.mock.calls[0][0];
		expect(settings.container).toBe(wrapper.element);
	});

	it('forwards key props to tns(), coercing items to int', () => {
		mountSlider({ items: '3', mode: 'gallery', loop: false, mouseDrag: true });
		const settings = tnsMock.mock.calls[0][0];
		expect(settings.items).toBe(3);
		expect(settings.mode).toBe('gallery');
		expect(settings.loop).toBe(false);
		expect(settings.mouseDrag).toBe(true);
	});

	it('fixedWidth passes through as false when falsy, or parsed int when set', () => {
		mountSlider();
		expect(tnsMock.mock.calls[0][0].fixedWidth).toBe(false);

		tnsMock.mockClear();
		mountSlider({ fixedWidth: '250' });
		expect(tnsMock.mock.calls[0][0].fixedWidth).toBe(250);
	});

	it('strips undefined props before calling tns()', () => {
		// `axis` has no default, so it will be undefined unless set.
		mountSlider();
		const settings = tnsMock.mock.calls[0][0];
		expect('axis' in settings).toBe(false);
	});

	it('emits init after tns() is created', () => {
		const wrapper = mountSlider();
		expect(wrapper.emitted('init')).toBeTruthy();
		expect(wrapper.emitted('init')).toHaveLength(1);
	});

	it('subscribes to every tiny-slider event in eventsList and re-emits them', () => {
		const fake = makeFakeSlider();
		tnsMock.mockImplementationOnce(() => fake);
		const wrapper = mountSlider();

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

	it('goTo(value) delegates to the underlying slider', () => {
		const fake = makeFakeSlider();
		tnsMock.mockImplementationOnce(() => fake);
		const wrapper = mountSlider();
		wrapper.vm.goTo(2);
		expect(fake.goTo).toHaveBeenCalledWith(2);
	});

	it('rebuild() replaces slider and emits rebuild', () => {
		const fake = makeFakeSlider();
		tnsMock.mockImplementationOnce(() => fake);
		const wrapper = mountSlider();
		wrapper.vm.rebuild();
		expect(fake.rebuild).toHaveBeenCalled();
		expect(wrapper.emitted('rebuild')).toBeTruthy();
	});

	it('getInfo() emits getInfo with payload and slider', () => {
		const info = { index: 7 };
		const fake = makeFakeSlider({ getInfo: vi.fn(() => info) });
		tnsMock.mockImplementationOnce(() => fake);
		const wrapper = mountSlider();
		wrapper.vm.getInfo();
		const emitted = wrapper.emitted('getInfo');
		expect(emitted).toBeTruthy();
		expect(emitted[0][0]).toBe(info);
		expect(emitted[0][1]).toBe(fake);
	});

	it('destroy() calls slider.destroy', () => {
		const fake = makeFakeSlider();
		tnsMock.mockImplementationOnce(() => fake);
		const wrapper = mountSlider();
		wrapper.vm.destroy();
		expect(fake.destroy).toHaveBeenCalled();
	});

	it('destroys the slider when the component is unmounted', () => {
		const fake = makeFakeSlider();
		tnsMock.mockImplementationOnce(() => fake);
		const wrapper = mountSlider();
		wrapper.unmount(); // test-utils v2 (Vue 3) API
		expect(fake.destroy).toHaveBeenCalled();
	});

	it('controlsText default is [prev, next]', () => {
		mountSlider();
		expect(tnsMock.mock.calls[0][0].controlsText).toEqual(['prev', 'next']);
	});
});
