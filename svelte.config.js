import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
<<<<<<< HEAD
	preprocess: vitePreprocess()
=======

	preprocess: [vitePreprocess({})]
>>>>>>> 44e7776542d789f539a270ca496f9723b9b0af5d
};
export default config;