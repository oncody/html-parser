import HtmlElementRegex from './html-element-regex.js';
import HtmlElementType from "./html/enum/html-element-type.js";
import HtmlAttribute from "./html/enum/html-attribute.js";
import HtmlElementByAttributeRegex from "./html-element-by-attribute-regex.js";

// This class helps to parse an element from an html string
export default class HtmlParser {

    /**
     * @param {string} text
     * @returns {HtmlParser}
     */
    constructor(text) {
        this._text = text;
        this._cursor = 0;
        this._unreadText = text;
    }

    /**
     * Returns a new HTML Parser
     * @param {HtmlElementType} elementType
     * @returns {HtmlParser}
     */
    lookupElement(elementType) {
        let regex = new HtmlElementRegex(elementType);
        let match = regex.firstMatch(this._unreadText);
        this.advanceCursor(match.endPosition());
        return new HtmlParser(match.text());
    }

    /**
     * Returns a new HTML Parser
     * @param {HtmlElementType} elementType
     * @param {string} attribute
     * @param {string} value
     * @returns {HtmlParser}
     */
    lookupElementByAttribute(elementType, attribute, value) {
        let regex = new HtmlElementByAttributeRegex(elementType, attribute, value);
        let match = regex.firstMatch(this._unreadText);
        this.advanceCursor(match.endPosition());
        return new HtmlParser(match.text());
    }

    /**
     * Returns a new HTML Parser
     * @param {HtmlElementType} elementType
     * @param {string} id
     * @returns {HtmlParser}
     */
    lookupElementById(elementType, id) {
        return this.lookupElementByAttribute(elementType, HtmlAttribute.ID.toString(), id);
    }

    /**
     * Returns an array of new HTML Parsers
     * @param {HtmlElementType} elementType
     * @returns {HtmlParser[]}
     */
    lookupElements(elementType) {
        let regex = new HtmlElementRegex(elementType);
        let matches = regex.allMatches(this._unreadText);
        let lastMatch = matches[matches.length - 1];
        this.advanceCursor(lastMatch.endPosition());
        return matches.map(match => new HtmlParser(match.text()));
    }

    /**
     * Returns a new HTML Parser
     * @returns {HtmlParser[]}
     */
    lookupTableRows() {
        // Find the next table
        let table = this.lookupElement(HtmlElementType.TABLE);

        // Get the rows from the table
        let tableTraverser = new HtmlParser(table.text());
        return tableTraverser.lookupElements(HtmlElementType.TABLE_ROW);
    }

    /**
     * @returns {undefined}
     */
    resetPosition() {
        this._cursor = 0;
        this._unreadText = this._text;
    }

    /**
     * @returns {undefined}
     */
    advanceCursor(position) {
        this._cursor += position;
        this._unreadText = this._text.substring(this._cursor);
    }

    /**
     * @returns {string}
     */
    text() {
        return this._text;
    }

}
