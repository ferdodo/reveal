export default {
	root: "./public",
	resolve: {
		alias: {
			"/bundle.js": "../src/main.ts"
		}
	},
	build: {
		sourcemap: true
	}
};
