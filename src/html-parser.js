import HtmlElementRegex from './html-element-regex.js';
import HtmlElementType from "./html/enum/html-element-type.js";
import HtmlAttribute from "./html/enum/html-attribute.js";
import HtmlElementByAttributeRegex from "./html-element-by-attribute-regex.js";

// This class helps to parse an element from an html string
export default class HtmlParser {
    constructor(html) {
        this._html = html;
        this._cursor = 0;
        this._substring = html;
    }

    lookupElement(elementType) {
        let regex = new HtmlElementRegex(elementType);
        let match = regex.firstMatch(this._substring);
        this.advanceCursor(match.endPosition());
        return match;
    }

    lookupElementById(elementType, id) {
        let regex = new HtmlElementByAttributeRegex(elementType, HtmlAttribute.ID.name(), id);
        let match = regex.firstMatch(this._substring);
        this.advanceCursor(match.endPosition());
        return match;
    }

    lookupElements(elementType) {
        let regex = new HtmlElementRegex(elementType);
        let matches = regex.allMatches(this._substring);
        let lastMatch = matches[matches.length - 1];
        this.advanceCursor(lastMatch.endPosition());
        return matches;
    }

    lookupTableRows() {
        // Find the next table
        let table = this.lookupElement(HtmlElementType.TABLE);

        // Get the rows from the table
        let tableTraverser = new HtmlParser(table.text());
        return tableTraverser.lookupElements(HtmlElementType.TABLE_ROW);
    }


    resetPosition() {
        this._cursor = 0;
        this._substring = this._html;
    }

    advanceCursor(position) {
        this._cursor += position;
        this._substring = this._html.substring(this._cursor);
    }
}
