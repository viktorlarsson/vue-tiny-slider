import type { DefineComponent } from 'vue';
import type {
	TinySliderSettings,
	TinySliderInstance,
	TinySliderInfo,
	SilderEvent
} from 'tiny-slider';

export type {
	TinySliderSettings,
	TinySliderInstance,
	TinySliderInfo,
	SilderEvent
};

/**
 * Props accepted by the `<VueTinySlider>` component.
 *
 * Inherits every tiny-slider option (except `container`, which the wrapper
 * sets to the component's root element) and adds a handful of wrapper-
 * specific props.
 */
export interface VueTinySliderProps
	extends Partial<Omit<TinySliderSettings, 'container'>> {
	/**
	 * Automatically call `init()` in the mounted hook.
	 * Set to `false` to call `init()` manually via `$refs`.
	 * @default true
	 */
	autoInit?: boolean;
	/**
	 * Position of the prev/next controls relative to the slider.
	 * @default "top"
	 */
	controlsPosition?: 'top' | 'bottom';
	/**
	 * Maximum viewport width (in px) considered for responsive breakpoints.
	 * @default false
	 */
	viewportMax?: number | string | boolean;
}

/**
 * The underlying tiny-slider instance and wrapper methods exposed on the
 * component instance (available through `$refs.yourRef`).
 */
export interface VueTinySliderInstance {
	/** The underlying tiny-slider instance once `init()` has resolved. */
	slider: TinySliderInstance | null;
	/** Initialize (or re-initialize) the slider. Returns a Promise because
	 *  tiny-slider is lazy-loaded to keep the module SSR-safe. */
	init(): Promise<void>;
	/** Go to a specific slide by index or keyword. */
	goTo(target: number | 'next' | 'prev' | 'first' | 'last'): void;
	/** Rebuild the slider. Emits `rebuild`. */
	rebuild(): void;
	/** Emits `getInfo` with the current slider state and instance. */
	getInfo(): void;
	/** Destroy the underlying tiny-slider instance. */
	destroy(): void;
}

declare const VueTinySlider: DefineComponent<VueTinySliderProps>;

export default VueTinySlider;
