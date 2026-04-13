# tiny-slider 2.0 for Vue

Wrapper for Tiny slider for all purposes by [ganlanyuan](https://github.com/ganlanyuan/tiny-slider) in Vue. [Live demo →](https://vue-tiny-slider-blush.vercel.app/)

[![version](https://img.shields.io/npm/v/vue-tiny-slider.svg)](https://www.npmjs.com/package/vue-tiny-slider) [![downloads](https://img.shields.io/npm/dt/vue-tiny-slider.svg)](https://www.npmjs.com/package/vue-tiny-slider) [![downloads per week](https://img.shields.io/npm/dw/vue-tiny-slider.svg)](https://www.npmjs.com/package/vue-tiny-slider)

## Table of Contents
  * [Compatibility](#compatibility)
  * [Install](#install)
  * [Use](#use)
  * [Styling](#styling)
  * [Options](#options)
  * [Methods](#methods)
      * [How to use the methods](#how-to-use-the-methods)
  * [Nuxt 3 SSR](#nuxt-3-ssr)
  * [Todos](#todo)
  * [Collaborators](#collaborators)
  * [License](#license)
  * [Cheerios &lt;3](#cheerios-3)

## Compatibility

| `vue-tiny-slider` | Vue      |
| ----------------- | -------- |
| `^1.0.0`          | Vue 3.x  |
| `^0.1.x`          | Vue 2.x  |

If you're on Vue 2, pin to `vue-tiny-slider@^0.1`.

## Install

`npm install vue-tiny-slider`

## Use

**Globally (Vue 3):**

````javascript
import { createApp } from 'vue';
import VueTinySlider from 'vue-tiny-slider';
import App from './App.vue';

createApp(App)
  .component('tiny-slider', VueTinySlider)
  .mount('#app');
````

**Or locally inside a single component:**

````javascript
import VueTinySlider from 'vue-tiny-slider';

export default {
  components: { 'tiny-slider': VueTinySlider }
}
````

````html
<tiny-slider :mouse-drag="true" :loop="false" items="2" gutter="20">
  <div>Slider item #1</div>
  <div>Slider item #2</div>
  <div>Slider item #3</div>
  <div>Slider item #4</div>
  <div>Slider item #5</div>
  <div>Slider item #6</div>
</tiny-slider>
````

## Styling

SCSS
````scss
@import 'tiny-slider/src/tiny-slider';
````

CDN
````html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.1/tiny-slider.css">
````

## Options

````
auto-init
items
mode
gutter
edge-padding
fixed-width
slide-by
controls
controls-text
controls-container
nav
nav-container
arrow-keys
speed
autoplay
autoplay-timeout
autoplay-direction
autoplay-text
autoplay-hover-pause
autoplay-button
autoplay-button-output
autoplay-reset-on-visibility
animate-in
animate-out
animate-normal
animate-delay
loop
rewind
auto-height
responsive
lazyload
touch
mouse-drag
nested
freezable
disable
on-init
center
lazy-load-selector
prevent-action-when-running
prevent-scroll-on-touch
nav-options
auto-width
````

For more detailed information about the options, see the [Tiny-slider documentation (Options)](https://github.com/ganlanyuan/tiny-slider#options).

## Methods

````getInfo````
````goTo````
````destroy````

### How to use the methods

To be able to use the methods, you need to use ref on the component. Ref is used to register a reference to an element or a child component.

```
<vue-tiny-slider ref="tinySlider"></vue-tiny-slider>
```

```
import VueTinySlider from 'vue-tiny-slider';

export default {
  ...,
    methods: {
        getInfo: function(event) {
             this.$refs.tinySlider.slider.getInfo();
        }
     }
}
```

For more detailed information about the methods, see the [Tiny-slider documentation (Methods)](https://github.com/ganlanyuan/tiny-slider#methods).

## Nuxt 3 SSR

Tiny-slider touches the DOM, so the component must only render on the client.

1. `npm install vue-tiny-slider`

2. Create `plugins/vue-tiny-slider.client.js` (the `.client` suffix makes it client-only):

```js
import VueTinySlider from 'vue-tiny-slider';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VueTinySlider', VueTinySlider);
});
```

3. Wrap the slider in `<ClientOnly>` where you use it:

```html
<ClientOnly>
  <vue-tiny-slider v-bind="tinySliderOptions">
    <div>#1</div>
    <div>#2</div>
    <div>#3</div>
  </vue-tiny-slider>
</ClientOnly>
```


## Todo
* ~~Add demo link from a fiddle or something similar~~
* Better handling of the responsive-settings
* Add Custom Events
* ~~Add Methods~~

## Collaborators
* [Morgan Eklund](https://github.com/rymdkapten)
* [Viktor Sarström](https://github.com/viktorlarsson)

## License

This project is available under the MIT license.

## Cheerios <3

* Fixed broken demo link, @VitorLuizC
* Moved tiny-slider from devDependencies to dependencies, @TitanFighter
* Added nav position to props, @Irsanarisandy
* Got it to work with NuxtJS SSR, @ilbonte
