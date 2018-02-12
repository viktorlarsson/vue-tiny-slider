import { tns } from 'tiny-slider/src/tiny-slider';

var VueTinySlider = {
	props: {
		mode: [String],
		axis: {
			type: [String],
			validator: value => {
				return value === 'horizontal' || value === 'vertical';
			}
		},
		items: {
			type:  [Number],
			default: 1
		},
		gutter: {
			type:  [String, Number],
			default: 0
		},
		edgePadding: {
			type:  [String, Number],
			default: 0
		},
		fixedWidth: {
			type:  [String, Boolean, Number],
			default: false
		},
		slideBy: {
			type:  [String, Number],
			default: 1
		},
		controls: {
			type:  [String, Boolean],
			default: true
		},
		controlsText: {
			type:  [Array],
			default: () => ['prev', 'next']
		},
		controlsContainer: {
			type: [Boolean, Node, String],
			default: false
		},
		nav: {
			type: [Boolean],
			default: false
		},
		navContainer: {
			type: [Boolean, Node, String],
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
			type: [Boolean, Node, String],
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
		onInit: {
			type: [Function, Boolean],
			default: false
		}
	},
	mounted: function() {
		this.init();
	},
	beforeDestroy: function() {
		this.destroy();
	},
	methods: {
		goTo: function(value) {
			this.slider.goTo(value)
		},
		getInfo: function() {
			this.$emit('getInfo', this.slider.getInfo(), this.slider);
		},
		destroy: function() {
			this.slider.destroy();
		},
		init: function() {
			var settings = {
				container: this.$el,
				axis: this.axis,
				items: this.items,
				mode: this.mode,
				gutter: this.gutter,
				edgePadding: this.edgePadding,
				fixedWidth: !this.fixedWidth ? this.fixedWidth : parseInt(this.fixedWidth, 10),
				slideBy: this.slideBy,
				controls: this.controls,
				controlsText: this.controlsText,
				controlsContainer: this.controlsContainer,
				nav: this.nav,
				navContainer: this.navContainer,
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
				onInit: this.onInit
			}
			removeUndefinedProps(settings);

			this.slider = tns(settings);
		},
	},
	render: function(h){
		return h('div', this.$slots.default)
	}
};

function removeUndefinedProps(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
			delete obj[prop];
		}
	}
}

module.exports = VueTinySlider;
