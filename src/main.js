import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: process.env.SVELTE_APP_NAME || 'world'
	}
});

export default app;