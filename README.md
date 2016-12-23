# MD.js 

- ~1kb minified+gzipped
- ~1.5kb minified

[![npm](https://img.shields.io/npm/v/md.js.svg?style=flat)](https://www.npmjs.com/package/md.js) [![licence](https://img.shields.io/badge/licence-MIT-blue.svg?style=flat)](https://github.com/thysultan/md.js/blob/master/LICENSE.md)

MD is a lightweight markdown parser with default support for langauge specific code blocks and XSS filtering, for example

```javascript
// replace . with `
```javascript
	var int = 0;
```
```

will output the following

```html
<pre><code class="language-javascript">
	var int = 0;
</code></pre>
```

XSS attempt `<script>alert(1);</script>` will be converted to `&lt;script&gt;alert(1)&lt;/script&gt;`
while `<a href="javascript:alert('xss')"></a>` will be converted to `<a href="#javascript&#58;alert('xss')"></a>`
and `<img onerror="alert(1)">` inline events will be remove and more.

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
<script src=https://unpkg.com/md.js@0.2.5/md.min.js></script>
```

#### npm

```
npm install md.js --save
```

#### Useage

```javascript
md('# Heading...');
```

# Examples

[demo](https://rawgit.com/thysultan/md.js/master/examples/index.html)