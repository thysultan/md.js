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

	var imagesRegExp = /!\[(.*)\]\((.*)\)/gm;
	var imagesTemplate = '<img src="$2" alt="$1">';

	var headingsRegExp = /(#+) +(.*)/gm;

	var paragraphsRegExp = /^([^-><#\d\+\_\*\t\n\[\! \{])(.*)/gm;
	var paragraphsTemplate = '<p>$1$2</p>';

	var horizontalRegExp = /^.*?(?:---|\*\*\*)/gm;
	var horizontalTemplate = '<hr>';

	var strongRegExp = /(?:\*\*|\_\_)([^\*_]+?)(?:\*\*|\_\_)/gm;
	var strongTemplate = '<strong>$1</strong>';

	var emphasisRegExp = /(?:\*|\_)([^\*_]+?)(?:\*|\_)/gm;
	var emphasisTemplate = '<em>$1</em>';

	var linksWithTitleRegExp = /\[(.*)\]\((.*) "(.*)"\)/gm;
	var linksWithTitleTemplate = '<a href="$2" title="$3">$1</a>';

	var linksRegExp = /\[(.*)\]\((.*)\)/gm;
	var linksTemplate = '<a href="$2">$1</a>';

	var listUlRegExp1 = /^.*?(?:-|\+|\*) (.*)/gm;
	var listUlRegExp2 = /(\<\/ul\>\n(.*)\<ul\>*)+/g;
	var listUlTemplate = '<ul><li>$1</li></ul>';

	var listOlRegExp1 = /^.*?(?:\d.) (.*)/gm;
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

		// collect code blocks and replace with placeholder
		// we do this to avoid code blocks matching the paragraph regexp
		markdown = markdown.replace(/```(.*)\n([^]+)```/gm, function (match, lang, block) {
			var placeholder = '{code-block-'+index+'}';
			var regex = new RegExp('{code-block-'+index+'}', 'g');

			code[index++] = {lang: lang, block: block, regex: regex};

			return placeholder;
		});

		// format, removes tabs, leading and trailing spaces
		markdown = markdown.replace(removeWhiteSpaceRegExp, '');

		// blockquotes
		markdown = markdown.replace(blockQuotesRegExp, blockQuotesTemplate);

		// inline code
		markdown = markdown.replace(inlineCodeRegExp, inlineCodeTemplate);

		// images
		markdown = markdown.replace(imagesRegExp, imagesTemplate);

		// headings
		markdown = markdown.replace(headingsRegExp, function (match, hash, content) {
			var length = hash.length; return '<h'+length+'>'+content+'</h'+length+'>';
		});

		// unorderd lists
		markdown = markdown.replace(listUlRegExp1, listUlTemplate);
		markdown = markdown.replace(listUlRegExp2, '');

		// ordered lists
		markdown = markdown.replace(listOlRegExp1, listOlTemplate);
		markdown = markdown.replace(listOlRegExp2, '');

		// horizontal rule 
		markdown = markdown.replace(horizontalRegExp, horizontalTemplate);

		// paragraphs
		markdown = markdown.replace(paragraphsRegExp, paragraphsTemplate);

		// links with title
		markdown = markdown.replace(linksWithTitleRegExp, linksWithTitleTemplate);

		// links
		markdown = markdown.replace(linksRegExp, linksTemplate);

		// strong
		markdown = markdown.replace(strongRegExp, strongTemplate);

		// emphasis
		markdown = markdown.replace(emphasisRegExp, emphasisTemplate);

		// replace code block placeholders
		for (var i = 0; i < index; i++) {
			var item = code[i];
			var lang = item.lang;
			var block = item.block;

			markdown = markdown.replace(item.regex, function (match) {
				return '<pre><code class="language-'+lang+'">'+block+'</code></pre>';
			});
		}

		// line breaks
		markdown = markdown.replace(lineBreaksRegExp, lineBreaksTemplate);

		return markdown;
	}
}));