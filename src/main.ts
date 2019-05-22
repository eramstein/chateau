import App from './App.svelte';
import { handleKeyPress } from './keybinds.ts'

var app = new App({
	target: document.body
});

export default app;

window.onkeypress = handleKeyPress;