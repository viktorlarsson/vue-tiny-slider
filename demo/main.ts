import { createApp, h } from 'vue';
// Pull from local source so the demo always exercises the working tree.
import VueTinySlider from '../src/index.js';

createApp({
	components: { VueTinySlider },
	render() {
		return h('div', { class: 'wrapper' }, [
			h('h1', 'vue-tiny-slider — local demo'),
			h('p', { class: 'lede' }, 'Drag, swipe, or click the controls.'),
			h(
				VueTinySlider,
				{
					mouseDrag: true,
					loop: false,
					items: '2',
					gutter: 20,
					controlsPosition: 'bottom',
					navPosition: 'bottom'
				},
				{
					default: () => [
						h('div', { class: 'slide' }, 'Slide 1'),
						h('div', { class: 'slide' }, 'Slide 2'),
						h('div', { class: 'slide' }, 'Slide 3'),
						h('div', { class: 'slide' }, 'Slide 4'),
						h('div', { class: 'slide' }, 'Slide 5'),
						h('div', { class: 'slide' }, 'Slide 6')
					]
				}
			)
		]);
	}
}).mount('#app');
