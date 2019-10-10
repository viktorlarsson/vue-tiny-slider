# tiny-slider 2.0 for Vue

Wrapper for Tiny slider for all purposes by [ganlanyuan](https://github.com/ganlanyuan/tiny-slider) in Vue. [Try it out](https://codesandbox.io/s/7m9w30xjz6)!

Firefox 12+, Chrome 15+, Safari 4+, Opera 12.1+, IE8+

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges) [![downloads](https://img.shields.io/npm/dt/vue-tiny-slider.svg)](https://github.com/badges/shields/) [![downloads per week](https://img.shields.io/npm/dw/vue-tiny-slider.svg)](https://github.com/badges/shields/) [![version badge](https://img.shields.io/npm/v/vue-tiny-slider.svg)](https://github.com/badges/shields/) 

## Table of Contents
  * [Install](#install)
  * [Use](#use)
  * [Styling](#styling)
  * [Options](#options)
  * [Methods](#methods)
      * [How to use the methods](#how-to-use-the-methods)
  * [NuxtJS SSR](#nuxtjs-ssr)
  * [Todos](#todo)
  * [Collaborators](#collaborators)
  * [License](#license)
  * [Cheerios &lt;3](#cheerios-3)

## Install

`npm install vue-tiny-slider`

## Use

````javascript
import VueTinySlider from 'vue-tiny-slider';

new Vue({
  components: {
    'tiny-slider': VueTinySlider
  }
})
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

## NuxtJS SSR

1. `yarn add vue-tiny-slider` or `npm install vue-tiny-slider`

2. In `nuxt.config.js` add 
``` js 
plugins: [{ src: '~/plugins/vue-tiny-slider.js', mode: 'client' }],
```

3. Create the file `plugins/vue-tiny-slider.js` with this content

```js
import Vue from 'vue'
import vTinySlider from 'vue-tiny-slider'
const VueTinySlider = {
  install(Vue, options) {
    Vue.component('VueTinySlider', vTinySlider)
  }
}
Vue.use(VueTinySlider)
```

Now you should be able to use it in any component **without** any import, like this:

```js
<no-ssr>
 <vue-tiny-slider v-bind="tinySliderOptions">
       <div>#1</div>
       <div>#2</div>
       <div>#3</div>
       <div>#4</div>
       <div>#5</div>
       <div>#6</div>
     </vue-tiny-slider>
</no-ssr>
```

A demo is available here: [https://codesandbox.io/s/jvjp349449](https://codesandbox.io/s/jvjp349449).


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
