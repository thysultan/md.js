# MD.js 

MD is a lightweight markdown parser with default support for langauge specific code blocks, for example

```javascript
// replace . with `
...javascript
	var int = 0;
...
```

will output the following

```html
<pre><code class="language-javascript">
	var int = 0;
</code></pre>
```

- ~1kb minified+gzipped
- ~1.5kb minified

[![npm](https://img.shields.io/npm/v/md.js.svg?style=flat)](https://www.npmjs.com/package/md.js) [![licence](https://img.shields.io/badge/licence-MIT-blue.svg?style=flat)](https://github.com/thysultan/md.js/blob/master/LICENSE.md)

## Browser Support

* Edge
* IE 8+
* Chrome
* Firefox
* Safari

# Installation

#### direct download

```html
<script src=md.min.js></script>
```

#### CDN

```html
<script src=https://unpkg.com/md.js@0.1.1/md.min.js></script>
```

#### npm

```
npm install md.js --save
```

# Examples

[demo](https://rawgit.com/thysultan/md.js/master/examples/index.html)