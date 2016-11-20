var md = require('../md.js');

var cases = {
	headings: {
		sample: `
			# Heading 1
			## Heading 2
			### Heading 3
			#### Heading 4
		`,
		expected: `
			<h1>Heading 1</h1><h2>Heading 2</h2>
			<h3>Heading 3</h3><h4>Heading 4</h4>
		`
	},
	lists: {
		sample: `
			- ul list 1
			- ul list 2

			* ul list 1
			* ul list 2
			* ul list 3

			+ ul list 1
			+ ul list 2

			1. ol list 1
			2. ol list 2
			3. ol list 3

			1) ol list 1
			2) ol list 2
			3) ol list 3
		`,
		expected: `
			<ul><li>ul list 1</li><li>ul list 2</li></ul>
			<ul><li>ul list 1</li><li>ul list 2</li><li>ul list 3</li></ul>
			<ul><li>ul list 1</li><li>ul list 2</li></ul>
			<ol><li>ol list 1</li><li>ol list 2</li><li>ol list 3</li></ol>
			<ol><li>ol list 1</li><li>ol list 2</li><li>ol list 3</li></ol>
		`
	},
	blockqoutes: {
		sample: `
			> hello world what is this
		`,
		expected: `
			<blockquote>hello world what is this</blockquote>
		`
	}
};

var results = [];

for (var name in cases) {
	results.push(md(cases[name].sample.trim()) === cases[name].expected.trim());
}

console.log(results);

// TODO... logger, fix expected cases (whitespace)