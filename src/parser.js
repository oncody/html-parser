import {RegexBuilder, RegexCharacter} from "@oncody/regex";

import {ElementRegex} from './regex/element-regex.js';
import {ElementType} from "./data/element-type.js";
import {Attribute} from "./data/attribute.js";
import {ElementByAttributeRegex} from "./regex/element-by-attribute-regex.js";

// This class helps to parse an element from an html string
class Parser {

    /**
     * @param {string} text
     * @returns {Parser}
     */
    constructor(text) {
        this._text = text;
        this._cursor = 0;
        this._unreadText = text;
    }

    /**
     * Returns a new HTML Parser
     * @param {ElementType} elementType
     * @returns {Parser}
     */
    lookupElement(elementType) {
        let regex = new ElementRegex(elementType);
        let match = regex.firstMatch(this._unreadText);
        this.advanceCursor(match.endPosition());
        return new Parser(match.text());
    }

    /**
     * Returns a new HTML Parser
     * @param {ElementType} elementType
     * @param {string} attribute
     * @param {string} value
     * @returns {Parser}
     */
    lookupElementByAttribute(elementType, attribute, value) {
        let regex = new ElementByAttributeRegex(elementType, attribute, value);
        let match = regex.firstMatch(this._unreadText);
        this.advanceCursor(match.endPosition());
        return new Parser(match.text());
    }

    /**
     * Returns a new HTML Parser
     * @param {ElementType} elementType
     * @param {string} id
     * @returns {Parser}
     */
    lookupElementById(elementType, id) {
        return this.lookupElementByAttribute(elementType, Attribute.ID.toString(), id);
    }

    /**
     * Returns an array of new HTML Parsers
     * @param {ElementType} elementType
     * @returns {Parser[]}
     */
    lookupElements(elementType) {
        let regex = new ElementRegex(elementType);
        let matches = regex.allMatches(this._unreadText);
        let lastMatch = matches[matches.length - 1];
        this.advanceCursor(lastMatch.endPosition());
        return matches.map(match => new Parser(match.text()));
    }

    /**
     * Returns a new HTML Parser
     * @returns {Parser[]}
     */
    lookupTableRows() {
        // Find the next table
        let table = this.lookupElement(ElementType.TABLE);

        // Get the rows from the table
        let tableTraverser = new Parser(table.text());
        return tableTraverser.lookupElements(ElementType.TABLE_ROW);
    }

    /**
     * Returns a new HTML Parser
     * @returns {Parser}
     */
    innerText() {
        let regex = new RegexBuilder()
            .match('>')
            .startCapturing()
            .match(RegexCharacter.WILDCARD.toString())
            .anyNumberOfTimesLazy()
            .stopCapturing()
            .match('<\/')
            .build();

        let match = regex.firstMatch(this._unreadText);
        this.advanceCursor(match.endPosition());
        return new Parser(match.text());
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

export {Parser}