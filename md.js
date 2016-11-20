/*!
 *             __
 *   __ _  ___/ /
 *  /  ' \/ _  / 
 * /_/_/_/\_,_/ 
 * 
 * md.js is a lightweight markdown parser
 * https://github.com/thysultan/md.js
 * 
 * @licence MIT
 */
(function (factory) {
	if (typeof exports === 'object' && typeof module !== 'undefined') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define(factory());
	} else {
		window.md = factory();
	}
}(function () {
	var removeWhiteSpaceRegExp = /^[\t ]+|[\t ]$/gm;

	var blockQuotesRegExp = /^.*?> (.*)/gm;
	var blockQuotesTemplate = '<blockquote>$1</blockquote>';

	var inlineCodeRegExp = /`([^`]+?)`/g;
	var inlineCodeTemplate = '<code>$1</code>';

	var blockCodeRegExp = /```(.*)\n([^]+)```(?!```)/gm;

	var imagesRegExp = /!\[(.*)\]\((.*)\)/gm;
	var imagesTemplate = '<img src="$2" alt="$1">';

	var headingsRegExp = /(#+) +(.*)/gm;
	var headingsTemplate = function (match, hash, content) {
		var length = hash.length; return '<h'+length+'>'+content+'</h'+length+'>';
	}

	var headingsCommonh2RegExp = /^[^\n\t ](.*)\n-+/gm;
	var headingsCommonh1RegExp = /^[^\n\t ](.*)\n=+/gm;
	var headingsCommonh1Template = '<h1>$1</h1>';
	var headingsCommonh2Template = '<h2>$1</h2>';

	var paragraphsRegExp = /^([^-><#\d\+\_\*\t\n\[\! \{])(.*)/gm;
	var paragraphsTemplate = '<p>$1$2</p>';

	var horizontalRegExp = /^.*?(?:---|\*\*\*)/gm;
	var horizontalTemplate = '<hr>';

	var strongRegExp = /(?:\*\*|\_\_)([^\*_]+?)(?:\*\*|\_\_)/gm;
	var strongTemplate = '<strong>$1</strong>';

	var emphasisRegExp = /(?:\*|\_)([^\*_]+?)(?:\*|\_)/gm;
	var emphasisTemplate = '<em>$1</em>';

	var linksWithTitleRegExp = /\[(.*?)\]\((.*?) "(.*)"\)/gm;
	var linksWithTitleTemplate = '<a href="$2" title="$3">$1</a>';

	var linksRegExp = /\[(.*?)\]\((.*?)\)/gm;
	var linksTemplate = '<a href="$2">$1</a>';

	var listUlRegExp1 = /^.*?(?:-|\+|\*) (.*)/gm;
	var listUlRegExp2 = /(\<\/ul\>\n(.*)\<ul\>*)+/g;
	var listUlTemplate = '<ul><li>$1</li></ul>';

	var listOlRegExp1 = /^.*?(?:\d(?:\)|\.)) (.*)/gm;
	var listOlRegExp2 = /(\<\/ol\>\n(.*)\<ol\>*)+/g;
	var listOlTemplate = '<ol><li>$1</li></ol>';

	var lineBreaksRegExp = /^\n\n+/gm;
	var lineBreaksTemplate = '<br>';


	/**
	 * markdown parser
	 * 
	 * @param  {string} markdown
	 * @return {string}
	 */
	return function md (markdown) {
		var code = [];
		var index = 0;

		// format, removes tabs, leading and trailing spaces
		markdown = (
			// collect code blocks and replace with placeholder
			// we do this to avoid code blocks matching the paragraph regexp
			markdown
				.replace(blockCodeRegExp, function (match, lang, block) {
					var placeholder = '{code-block-'+index+'}';
					var regex = new RegExp('{code-block-'+index+'}', 'g');

					code[index++] = {lang: lang, block: block, regex: regex};

					return placeholder;
				})
				// whitespace
				.replace(removeWhiteSpaceRegExp, '')
				// blockquotes
				.replace(blockQuotesRegExp, blockQuotesTemplate)
				// inline code
				.replace(inlineCodeRegExp, inlineCodeTemplate)
				// images
				.replace(imagesRegExp, imagesTemplate)
				// headings
				.replace(headingsRegExp, headingsTemplate)
				// headings h1 (commonmark)
				.replace(headingsCommonh1RegExp, headingsCommonh1Template)
				// headings h2 (commonmark)
				.replace(headingsCommonh2RegExp, headingsCommonh2Template)
				// unorderd lists
				.replace(listUlRegExp1, listUlTemplate)
				.replace(listUlRegExp2, '')
				// ordered lists
				.replace(listOlRegExp1, listOlTemplate)
				.replace(listOlRegExp2, '')
				// horizontal rule 
				.replace(horizontalRegExp, horizontalTemplate)
				// paragraphs
				.replace(paragraphsRegExp, paragraphsTemplate)
				// links with title
				.replace(linksWithTitleRegExp, linksWithTitleTemplate)
				// links
				.replace(linksRegExp, linksTemplate)
				// strong
				.replace(strongRegExp, strongTemplate)
				// emphasis
				.replace(emphasisRegExp, emphasisTemplate)
				// line breaks
				.replace(lineBreaksRegExp, lineBreaksTemplate)
		);

		// replace code block placeholders
		for (var i = 0; i < index; i++) {
			var item = code[i];
			var lang = item.lang;
			var block = item.block;

			markdown = markdown.replace(item.regex, function (match) {
				return '<pre><code class="language-'+lang+'">'+block+'</code></pre>';
			});
		}

		return markdown;
	}
}));