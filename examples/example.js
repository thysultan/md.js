var markdown = (
	'Use the `printf()` function.\n'+

	'```javascript\n\n\t\tvar i = 10;\nvar foo = 2;\n<script>1</script>\n```' +

`
	# Heading 1
	## Heading 2
	### Heading 3
	#### *Heading 4*

	Heading 1 (commonmark)
	====

	Heading 2 (commonmark)
	----

	![Alt text](https://thysultan.com/dio/assets/logo.svg)

	This is [an example](http://example.com/ "Title") inline link.

	***

	Lorem ipsum dolor sit amet, _consectetur_ adipisicing elit. 
	Cupiditate doloremque sed vero __excepturi__.

	XSS filter <script>alert(1);</script> should not alert.

	XSS filter href <a href="javascript:alert('xss')">*you*</a>

	Lorem ipsum dolor sit amet, *consectetur* adipisicing elit. 
	Cupiditate doloremque sed vero **excepturi**.

	[a link](http://google.com)

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

	> hello world what is this

	---

	<table>
	    <tr>
	        <td>This is an html table block</td>
	    </tr>
	</table>

	<div style="color:red">This is a styled html div</div>

	Another paragraphs
`);

// markdown = '#  Title\n\nAnd *now* [a link](http://www.google.com) to **follow** and [another](http://yahoo.com/).\n\n* One\n* Two\n* Three\n\n## Subhead\n\nOne **two** three **four** five.\n\nOne __two__ three _four_ five __six__ seven _eight_.\n\n1. One\n2. Two\n3. Three\n\nMore text with `inline($code)` and :"quote": sample.\n\n> A block quote\n> across two lines.\nMore text...';

var html = md(markdown);
document.body.insertAdjacentHTML('beforeend', html);
console.log(html);