import uglify from 'rollup-plugin-uglify-es';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const MYBASEELEMENT_BUNDLE= {
	input: 'index.mjs',
	output: {
		name: "myBaseElement",
		file: 'public/elements/my-base-element.mjs',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
		production && uglify({ output: { quote_style: 3 } }) // minify, but only in production
	]
};

const MYCLICKELEMENT_BUNDLE= {
	input: 'elements/my-click-base-element.mjs',
	output: {
		name: "myClickElement",
		file: 'public/elements/my-click-base-element.mjs',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	}
	
};

const COMMON = {
    plugins: [
		production && uglify({ output: { quote_style: 3 } }) // minify, but only in production
	]
}

export default [
	Object.assign({},MYCLICKELEMENT_BUNDLE, COMMON),
	Object.assign({},MYBASEELEMENT_BUNDLE, COMMON)	
]