import { h } from 'vue';

// `Node` is a browser DOM global; fall back to Object on the server so that
// defining the component doesn't throw during SSR module evaluation.
var NodeType = typeof Node !== 'undefined' ? Node : Object;

var VueTinySlider = {
	eventsList: [
		'indexChanged',
		'transitionStart',
		'transitionEnd',
		'newBreakpointStart',
		'newBreakpointEnd',
		'touchStart',
		'touchMove',
		'touchEnd',
		'dragStart',
		'dragMove',
		'dragEnd'
	],
	props: {
		mode: {
			type: [String],
			default: 'carousel'
		},
		autoInit: {
			type: [Boolean],
			default: true
		},
		axis: {
			type: [String],
			validator: value => {
				return value === 'horizontal' || value === 'vertical';
			}
		},
		items: {
			type: [String, Number],
			default: 1
		},
		gutter: {
			type: [String, Number],
			default: 0
		},
		edgePadding: {
			type: [String, Number],
			default: 0
		},
		fixedWidth: {
			type: [String, Boolean, Number],
			default: false
		},
		viewportMax: {
			type: [String, Boolean, Number],
			default: false
		},
		swipeAngle: {
			type: [Boolean, Number],
			default: 15
		},
		slideBy: {
			type: [String, Number],
			default: 1
		},
		controls: {
			type: [String, Boolean],
			default: true
		},
		controlsPosition: {
			type: [String],
			validator: value => {
				return value === 'top' || value === 'bottom';
			},
			default: 'top'
		},
		controlsText: {
			type: [Array],
			default: () => ['prev', 'next']
		},
		controlsContainer: {
			type: [Boolean, NodeType, String],
			default: false
		},
		prevButton: {
			type: [NodeType, String, Boolean],
			default: false
		},
		nextButton: {
			type: [NodeType, String, Boolean],
			default: false
		},
		nav: {
			type: [Boolean],
			default: true
		},
		navPosition: {
			type: [String],
			default: "top"
		},
		navContainer: {
			type: [Boolean, NodeType, String],
			default: false
		},
		navAsThumbnails: {
			type: [Boolean],
			default: false
		},
		arrowKeys: {
			type: [Boolean],
			default: false
		},
		speed: {
			type: [String, Number],
			default: 300
		},
		autoplay: {
			type: [Boolean],
			default: false
		},
		autoplayTimeout: {
			type: [Number],
			default: 5000
		},
		autoplayDirection: {
			type: [String],
			default: 'forward',
			validator: value => {
				return value === 'forward' || value === 'backward';
			}
		},
		autoplayText: {
			type: [Array],
			default: () => ['start', 'stop']
		},
		autoplayHoverPause: {
			type: [Boolean],
			default: false
		},
		autoplayButton: {
			type: [Boolean, NodeType, String],
			default: false,
		},
		autoplayButtonOutput: {
			type: [Boolean],
			default: true
		},
		autoplayResetOnVisibility: {
			type: [Boolean],
			default: true,
		},
		animateIn: {
			type: [String],
			default: 'tns-fadeIn'
		},
		animateOut: {
			type: [String],
			default: 'tns-fadeOut'
		},
		animateNormal: {
			type: [String],
			default: 'tns-normal'
		},
		animateDelay: {
			type: [String, Number, Boolean],
			default: false
		},
		loop: {
			type: [Boolean],
			default: true
		},
		rewind: {
			type: [Boolean],
			default: false
		},
		autoHeight: {
			type: [Boolean],
			default: false
		},
		responsive: {
			type: [Boolean, Object],
			default: false
		},
		lazyload: {
			type: [Boolean],
			default: false
		},
		touch: {
			type: [Boolean],
			default: true
		},
		mouseDrag: {
			type: [Boolean],
			default: false
		},
		nested: {
			type: [String, Boolean],
			default: false,
			validator: value => {
				return value === 'inner' || value === 'outer' || value === false;
			}
		},
		freezable: {
			type: [Boolean],
			default: true
		},
		disable: {
			type: [Boolean],
			default: false
		},
		startIndex: {
			type: [Number],
			default: 0
		},
		onInit: {
			type: [Function, Boolean],
			default: false
		},
		center: {
			type: Boolean,
			default: false
		},
		lazyLoadSelector: {
			type: String,
			default: '.tns-lazy-img'
		},
		preventActionWhenRunning: {
			type: Boolean,
			default: false
		},
		autoWidth: {
			type: Boolean,
			default: false
		},
		preventScrollOnTouch: {
			type: [String, Boolean],
			default: false,
			validator: value => {
				return value === 'auto' || value === 'force' || value === false;
			}
		},
		useLocalStorage: {
			type: [Boolean],
			default: true
		}
	},
	mounted: function () {
		if(this.autoInit) {
			// init() is async (lazy-loads tiny-slider); swallow the returned
			// promise — consumers who need ready-state should use @init event.
			this.init();
		}
	},
	beforeUnmount: function() {
		if(this.slider) {
			this.slider.destroy();
		}
	},
	methods: {
		$_vueTinySlider_subscribeTo (eventName) {
			this.slider.events.on(eventName, (info) => {
				this.$emit(eventName, info);
			});
		},
		$_vueTinySlider_subscribeToAll () {
			this.$options.eventsList.forEach(this.$_vueTinySlider_subscribeTo)
		},
		goTo: function(value) {
			this.slider.goTo(value);
		},
		rebuild: function() {
			this.slider = this.slider.rebuild();
			this.$emit('rebuild');
		},
		getInfo: function() {
			this.$emit('getInfo', this.slider.getInfo(), this.slider);
		},
		destroy: function() {
			this.slider.destroy();
		},
		init: async function() {
			// Lazy-import tiny-slider so the module's top-level `document` /
			// `window` access never runs during SSR (mounted only fires on the
			// client, so this import only happens client-side).
			//
			// We import the pre-built `dist/tiny-slider.js` (single-file CJS
			// bundle) rather than the raw `src/tiny-slider`. The ESM source
			// exports an unbound `requestAnimationFrame` reference; modern
			// bundlers turn the import into namespace-object access
			// (`mod.raf(...)`) which sets `this = mod` and trips an
			// "Illegal invocation" inside the browser API on every pan/drag.
			// The CJS bundle keeps `raf(...)` as a bare call, so it works.
			// The dist path is explicit because some bundlers (Bun) prefer
			// the ESM `src/` even when `main` points at the dist bundle.
			var { tns } = await import('tiny-slider/dist/tiny-slider.js');

			var settings = {
				container: this.$el,
				axis: this.axis,
				items: parseInt(this.items),
				mode: this.mode,
				gutter: this.gutter,
				edgePadding: this.edgePadding,
				fixedWidth: !this.fixedWidth ? this.fixedWidth : parseInt(this.fixedWidth, 10),
				viewportMax: this.viewportMax,
				slideBy: this.slideBy,
				controls: this.controls,
				controlsPosition: this.controlsPosition,
				controlsText: this.controlsText,
				controlsContainer: this.controlsContainer,
				prevButton: this.prevButton,
				nextButton: this.nextButton,
				nav: this.nav,
				navPosition: this.navPosition,
				navContainer: this.navContainer,
				navAsThumbnails: this.navAsThumbnails,
				arrowKeys: this.arrowKeys,
				speed: this.speed,
				autoplay: this.autoplay,
				autoplayTimeout: this.autoplayTimeout,
				autoplayDirection: this.autoplayDirection,
				autoplayText: this.autoplayText,
				autoplayHoverPause: this.autoplayHoverPause,
				autoplayButton: this.autoplayButton,
				autoplayButtonOutput: this.autoplayButtonOutput,
				autoplayResetOnVisibility: this.autoplayResetOnVisibility,
				animateIn: this.animateIn,
				animateOut: this.animateOut,
				animateNormal: this.animateNormal,
				animateDelay: this.animateDelay,
				loop: this.loop,
				rewind: this.rewind,
				autoHeight: this.autoHeight,
				responsive: this.responsive,
				lazyload: this.lazyload,
				touch: this.touch,
				mouseDrag: this.mouseDrag,
				nested: this.nested,
				freezable: this.freezable,
				disable: this.disable,
				onInit: this.onInit,
				swipeAngle: this.swipeAngle,
				startIndex: this.startIndex,
				center: this.center,
				lazyLoadSelector: this.lazyLoadSelector,
				preventActionWhenRunning: this.preventActionWhenRunning,
				preventScrollOnTouch: this.preventScrollOnTouch,
				autoWidth: this.autoWidth,
				useLocalStorage: this.useLocalStorage
			};
			removeUndefinedProps(settings);

			this.slider = tns(settings);

			// Emit init event
			this.$emit('init');
			// Subscribe to all kind of tiny-slider events
			this.$_vueTinySlider_subscribeToAll();
		},
	},
	render: function(){
		return h('div', this.$slots.default ? this.$slots.default() : []);
	}
};

function removeUndefinedProps(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
			delete obj[prop];
		}
	}
}

export default VueTinySlider;
