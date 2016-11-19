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
	var blockQuotesTemp = '<blockquote>$1</blockquote>';

	var inlineCodeRegExp = /`([^`]+?)`/g;
	var inlineCodeTemp = '<code>$1</code>';

	var imagesRegExp = /!\[(.*)\]\((.*)\)/gm;
	var imagesTemp = '<img src="$2" alt="$1">';

	var headingsRegExp = /(#+) +(.*)/gm;

	var paragraphsRegExp = /^([^-><#\d\+\_\*\t\n\[\! \{])(.*)/gm;
	var paragraphsTemp = '<p>$1$2</p>';

	var horizontalRegExp = /^.*?(?:---|\*\*\*)/gm;
	var horizontalTemp = '<hr/>';

	var strongRegExp = /(?:\*\*|\_\_)([^\*_]+?)(?:\*\*|\_\_)/gm;
	var strongTemp = '<strong></strong>';

	var emphasisRegExp = /(?:\*|\_)([^\*_]+?)(?:\*|\_)/gm;
	var emphasisTemp = '<em>$1</em>';

	var linksWithTitleRegExp = /\[(.*)\]\((.*) "(.*)"\)/gm;
	var linksWithTitleTemp = '<a href="$2" title="$3">$1</a>';

	var linksRegExp = /\[(.*)\]\((.*)\)/gm;
	var linksTemp = '<a href="$2">$1</a>';

	var listUlRegExp1 = /^.*(?:-|\+|\*) (.*)/gm;
	var listUlRegExp2 = /^.*(\<\/ul\>\n(.*)\<ul\>*)+/g;
	var listUlTemp = '<ul><li>$1</li></ul>';

	var listOlRegExp1 = /^.*?(?:\d.) (.*)/gm;
	var listOlRegExp2 = /^.*?(\<\/ol\>\n(.*)\<ol\>*)+/g;
	var listOlTemp = '<ol><li>$1</li></ol>';

	var lineBreaksRegExp = /^\n\n+/gm;
	var lineBreaksTemp = '\n<br/>\n\n';


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
		markdown = markdown.replace(blockQuotesRegExp, blockQuotesTemp);

		// inline code
		markdown = markdown.replace(inlineCodeRegExp, inlineCodeTemp);

		// images
		markdown = markdown.replace(imagesRegExp, imagesTemp);

		// headings
		markdown = markdown.replace(headingsRegExp, function (match, hash, content) {
			var length = hash.length; return '<h'+length+'>'+content+'</h'+length+'>';
		});

		// unorderd lists
		markdown = markdown.replace(listUlRegExp1, listUlTemp);
		markdown = markdown.replace(listUlRegExp2, '');

		// ordered lists
		markdown = markdown.replace(listOlRegExp1, listOlTemp);
		markdown = markdown.replace(listOlRegExp2, '');

		// horizontal rule 
		markdown = markdown.replace(horizontalRegExp, horizontalTemp);

		// paragraphs
		markdown = markdown.replace(paragraphsRegExp, paragraphsTemp);

		// links with title
		markdown = markdown.replace(linksWithTitleRegExp, linksWithTitleTemp);

		// links
		markdown = markdown.replace(linksRegExp, linksTemp);

		// strong
		markdown = markdown.replace(strongRegExp, strongTemp);

		// emphasis
		markdown = markdown.replace(emphasisRegExp, emphasisTemp);

		// replace code block placeholders
		for (var i = 0; i < index; i++) {
			var item = code[i];
			var lang = item.lang;
			var block = item.block;

			markdown = markdown.replace(item.regex, function (match) {
				return '<pre><code class="language-'+lang+'">'+block+'</code></pre>\n';
			});
		}

		// line breaks
		markdown = markdown.replace(lineBreaksRegExp, lineBreaksTemp);

		return markdown;
	}
}));