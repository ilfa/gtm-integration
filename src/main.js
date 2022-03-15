import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: process.env.SVELTE_APP_NAME || 'world',
		gtmId: process.env.SVELTE_APP_GTM_ID
	}
});

export default app;