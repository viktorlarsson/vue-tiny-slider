// Smoke-check the published types from a consumer perspective.
// Run: npx tsc --noEmit tests/types-check.ts (or let CI do it)
import VueTinySlider, {
	type VueTinySliderProps,
	type VueTinySliderInstance,
	type TinySliderInfo,
	type SilderEvent
} from '../src/index.js';

// Default export is a Vue component.
const _component = VueTinySlider;

// Prop interface accepts documented options.
const _props: VueTinySliderProps = {
	items: 3,
	gutter: 20,
	loop: false,
	mouseDrag: true,
	autoInit: false,
	controlsPosition: 'bottom',
	controlsText: ['prev', 'next'],
	mode: 'carousel',
	autoplay: true,
	preventScrollOnTouch: 'auto'
};

// Instance shape available via $refs.
const _fakeRef: VueTinySliderInstance = {
	slider: null,
	init: () => Promise.resolve(),
	goTo: (_t: number | 'next' | 'prev' | 'first' | 'last') => {},
	rebuild: () => {},
	getInfo: () => {},
	destroy: () => {}
};

// Event name type is re-exported from tiny-slider.
const _evt: SilderEvent = 'indexChanged';
const _info: TinySliderInfo = {} as TinySliderInfo;

export { _component, _props, _fakeRef, _evt, _info };
