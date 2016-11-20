/**
 * tester runner
 *
 * excutes tests given an object describing the tests
 * based on sample input vs expected output
 * if output === expected output, test passed
 * else test failed
 *
 * log format
 *
 * ------
 * 
 * Tests Passed #
 *
 * ...
 *
 * [Finnished In] #ms
 * 
 * Tests Failed #
 *
 * ...
 *
 * [Finnished In] #ms
 */


var browser = this && !!this.window;
var md = browser ? this.md : require('../md.js');

/**
 * run tests
 * @return {Object} tests
 */
function run (tests) {
	var start = Date.now();

	var passed = [];
	var failed = [];

	var format = {
		reset:     browser ? '' : '\x1b[0m',
		green:     browser ? '' : '\x1b[32m',
		red:       browser ? '' : '\x1b[31m',
		yellow:    browser ? '' : '\x1b[33m',
		underline: browser ? '' : '\x1b[4m',
		dim:       browser ? '' : '\x1b[2m',
		bold:      browser ? '' : '\x1b[1m',
		clear:     browser ? '' : '\x1Bc\n'
	};

	for (var name in tests) {
		var test = tests[name];

		var name = test.name.trim();
		var sample = test.sample.trim();
		var expected = test.expected.trim();

		var result = md(sample);

		(result === expected ? passed : failed).push(name);

		if (result !== expected) {
			// log why it failed
			console.log('failed:\n'+ result);
			console.log('expected:\n'+ expected);
		}
	}

	var end = '\n\n'+format.reset+'[Finnished In] '+(Date.now()-start)+'ms\n';

	// start test logger
	console.log('\n------');

	// passed
	console.log(
		format.bold+'\nTests Passed '+passed.length+format.reset+format.green + '\n\n'+passed.join('\n')+end
	);

	// failed
	console.log(
		format.bold+'Tests Failed '+failed.length+format.reset+format.red + '\n\n'+(failed.join('\n') || 'no failed tests')+end
	);

	// if failed trigger exit
	if (failed.length) {
		if (browser) {
			console.error(new Error('^^^'));
		} else {
			process.exit(1);
		}
	}
}


/**
 * define tests
 * @type {Object}
 */
var tests = {
	headings: {
		name: 'headings',
		sample: `
			# Heading 1
			## Heading 2
			### Heading 3
			#### Heading 4
			Heading 1
			====
			Heading 2
			----
		`,
		expected: `
<h1>Heading 1</h1><h2>Heading 2</h2>
<h3>Heading 3</h3><h4>Heading 4</h4>
<h1>Heading 1</h1><h2>Heading 2</h2>
		`
	},
	lists: {
		name: 'lists',
		sample: `
			- [x] ul list 1
			- [ ] ul list 2

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
<ul><li><input type="checkbox" disabled checked> ul list 1</li><li><input type="checkbox" disabled> ul list 2</li></ul>
<ul><li>ul list 1</li><li>ul list 2</li></ul>
<ul><li>ul list 1</li><li>ul list 2</li><li>ul list 3</li></ul>
<ul><li>ul list 1</li><li>ul list 2</li></ul>
<ol><li>ol list 1</li><li>ol list 2</li><li>ol list 3</li></ol>
<ol><li>ol list 1</li><li>ol list 2</li><li>ol list 3</li></ol>
		`
	},
	blockqoutes: {
		name: 'blockqoutes',
		sample: `> hello world what is this`,
		expected: `<blockquote>hello world what is this</blockquote>`
	},
	horizontal: {
		name: 'horizontal rule',
		sample: `
		---
		***
		- - -
		* * *
		`,
		expected: `
<hr><hr>
<hr><hr>
		`
	},
	images: {
		name: 'images',
		sample: `![Alt text](https://thysultan.com/dio/assets/logo.svg)`,
		expected: `<img src="https://thysultan.com/dio/assets/logo.svg" alt="Alt text">`
	},
	links: {
		name: 'links',
		sample: `[an example](http://example.com/ "Title")`,
		expected: `<a href="http://example.com/" title="Title">an example</a>`
	},
	paragraphs: {
		name: 'paragraphs',
		sample: `
			Lorem ipsum dolor sit amet, _consectetur_ adipisicing elit. 
			Cupiditate doloremque sed vero __excepturi__.
			Lorem ipsum dolor sit amet, *consectetur* adipisicing elit. 
			Cupiditate doloremque sed vero **excepturi**.
			Another paragraphs # Heading, will not match this
		`,
		expected: `
<p>Lorem ipsum dolor sit amet, <em>consectetur</em> adipisicing elit.
Cupiditate doloremque sed vero <strong>excepturi</strong>.
Lorem ipsum dolor sit amet, <em>consectetur</em> adipisicing elit.
Cupiditate doloremque sed vero <strong>excepturi</strong>.
Another paragraphs # Heading, will not match this</p>
		`
	},
	emphasis: {
		name: 'emphasis',
		sample: `
			_consectetur_
			*excepturi*
		`,
		expected: `
<em>consectetur</em>
<em>excepturi</em>
		`
	},
	strong: {
		name: 'strong',
		sample: `
			__consectetur__
			**excepturi**
		`,
		expected: `
<strong>consectetur</strong>
<strong>excepturi</strong>
		`
	},
	html: {
		name: 'html',
		sample: `
			<div style="color:red">This is a styled html div</div>
		`,
		expected: `
<div style="color:red">This is a styled html div</div>
		`
	},
	code: {
		name: 'code',
		sample: 'Use the `printf()` function\n\n```javascript\n\t\tvar i = 10;\n\tvar foo = 2;<script>1</script>\n```',
		expected: '<p>Use the <code>printf()</code> function</p>\n'+
		'<pre><code class="language-javascript">\t\tvar i = 10;\n\tvar foo = 2;&lt;script&gt;1&lt;/script&gt;\n</code></pre>'
	}
};


/**
 * execute tests
 */
run(tests);