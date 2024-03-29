<script>
	export let name;

	// https://gist.github.com/jssteinberg/a3f901440c9d1b567b22e4ebeae03d70
	import { onMount } from 'svelte';
	/** @type {string} gtmId - GTM ID 'GTM-F00BARS'. */
	export let gtmId = '';
	/** @type {(Object[]|Object)} [gtmDataPoints=[]] - Array or single object of custom data points for dataLayer.
	 * @type {Object} [gtmDataPoints[]] - Custom data point Object.
	 * @type {string} [gtmDataPoints[][]] - Custom data point property. */
	export let gtmDataPoints = [];
	/** @type {number} [timeout] - The number of milliseconds to timeout intiating loading the GTM script from Google */
	export let timeout = 0;
	/** @type {boolean} [dev=false] - Set to true to give errors */
	export let dev = false;
	let scriptSrc;
	/** getFunctionScriptElementFromInitGtm - Sets global dataLayer on Window Object.
	 * @param {(Object[]|Object)} [customDataPoints=[]] - Array or single object of custom data points for dataLayer.
	 * @param {Object} [customDataPoints[]] - Custom data point Object.
	 * @param {string} [customDataPoints[][]] - Custom data point property.
	 * @param {Object} [globalObject=window] – E.g. a reference to the Window Object (window).
	 * @returns {getFunctionScriptElementFromInitGtm~getScriptSrcForGtm} - function. */
	const getScriptSrcFromInitGtm = ( customDataPoints = [], globalObject = window ) => {
		const requiredDataPoint = {
			'gtm.start': new Date().getTime(),
			event: 'gtm.js',
		};
		/** getScriptSrcForGtm - Returns script src.
		 *  @param {string} gtmId - GTM ID 'GTM-F00BARS'.
		 *  @returns {string} - Src for script element. */
		const getScriptSrcForGtm = ( gtmId ) => {
			if (!dev && (typeof gtmId !== 'string' || !gtmId.length)) {
				return;
			} else if (typeof gtmId !== 'string' || !gtmId.length) {
				console.error('Google Tag Manager.', 'Missing/wrong `gtmId`.');
			} else {
				return `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
			}
		}
		try {
			const dataLayer = [requiredDataPoint].concat(customDataPoints);
			/* Get/set global dataLayer on global Object (e.g., `window`).
			* Custom data points should be set before GTM script loads. */
			globalObject['dataLayer'] = globalObject['dataLayer'] ?
					[...globalObject['dataLayer'], ...dataLayer]
					: dataLayer;
		} catch (error) {
			if (!dev) console.error('Google Tag Manager.', error);
		} finally {
			return getScriptSrcForGtm; // …no matter what, for no error.
		}
	}
	onMount( () => {
		if (!timeout) scriptSrc = getScriptSrcFromInitGtm( gtmDataPoints )( gtmId );
		else setTimeout(() => {
			scriptSrc = getScriptSrcFromInitGtm( gtmDataPoints )( gtmId );
		}, timeout);
	});
</script>

<svelte:head>
	{#if scriptSrc}
		<script src="{scriptSrc}" defer></script>
	{/if}
</svelte:head>
<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<form action="#" id="form1">
		<lable>Field 1<input type="text" id="field1"></lable>
		<input type="hidden" id="hidden1" value="hidden1">
	</form>
	<form action="/" id="form2">
		<lable>Field 2<input type="text" id="field2"></lable>
		<input type="hidden" id="hidden2" value="hidden2">
	</form>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
