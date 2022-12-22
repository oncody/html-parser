import HtmlElementRegex from './html-element-regex.js';
import MatchType from './match-type.js';
import HtmlElementType from "./html-element-type.js";

import StringParser from 'oncody-regex/src/string-parser.js';

// This class helps to parse an element from an html string
export default class HtmlParser {
    constructor(html) {
        this._html = html;
        this._cursor = 0;
        this._substring = html;
    }

    parseElement(elementType, matchType) {
        let elementRegex = new HtmlElementRegex(elementType);

        switch (matchType) {
            case MatchType.FIRST_MATCH:
                return this._firstMatch(elementRegex);
            case MatchType.ALL_MATCHES:
                return this._allMatches(elementRegex);
        }

        return null;
    }

    parseElementByAttribute(elementType, htmlAttribute, attributeValue, matchType) {
        let elementRegex = new HtmlElementRegex(elementType);
        elementRegex.byAttribute(htmlAttribute, attributeValue);

        switch (matchType) {
            case MatchType.FIRST_MATCH:
                return this._firstMatch(elementRegex);
            case MatchType.ALL_MATCHES:
                return this._allMatches(elementRegex);
        }

        return null;
    }

    parseTableRows() {
        // Find the next table
        let table = this.parseElement(HtmlElementType.TABLE, MatchType.FIRST_MATCH);

        // Get the rows from the table
        let tableTraverser = new HtmlParser(table.text());
        return tableTraverser.parseElement(HtmlElementType.TABLE_ROW, MatchType.ALL_MATCHES);
    }

    // This one will not work if there is a nested element
    _firstMatch(htmlElementRegex) {
        // find the opening tag
        let openingTagMatch = htmlElementRegex.regex().firstMatch(this._substring)

        // grab all text between the opening tag and the closing tag
        let stringParser = new StringParser(this._substring);
        let elementMatch = stringParser.matchBetweenTwoStrings(openingTagMatch.text(), htmlElementRegex.elementType().closingTag());

        this.advanceCursor(elementMatch.endPosition());

        return elementMatch;
    }

    _allMatches(htmlElementRegex) {
        let matches = htmlElementRegex.regex().allMatches(this._html);
        let lastMatch = null;

        let matchesTransformed = matches.map(match => {
            // console.log(match);
            let stringParser = new StringParser(this._html.substring(match.startPosition()));
            let fullMatch = stringParser.matchBetweenTwoStrings(match.text(), htmlElementRegex.elementType().closingTag());
            lastMatch = fullMatch;
            return fullMatch;
        });

        this.advanceCursor(lastMatch.endPosition());

        return matchesTransformed;
    }

    resetPosition() {
        this._cursor = 0;
    }

    advanceCursor(position) {
        this._cursor += position;
        this._substring = this._html.substring(this._cursor);
    }
}
