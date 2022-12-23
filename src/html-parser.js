import HtmlRegex from './html-regex.js';
import HtmlElementType from "./html/enum/html-element-type.js";
import HtmlAttribute from "./html/enum/html-attribute.js";

// This class helps to parse an element from an html string
export default class HtmlParser {
    constructor(html) {
        this._html = html;
        this._cursor = 0;
        this._substring = html;
    }

    lookupElement(elementType) {
        let regex = new HtmlRegex(elementType);
        let match = regex.firstMatch(this._substring);
        this.advanceCursor(match.endPosition());
        return match;
    }

    lookupElementById(elementType, id) {
        let regex = new HtmlRegex(elementType);
        let match = regex.byAttribute(HtmlAttribute.ID, id).firstMatch(this._substring);
        this.advanceCursor(match.endPosition());
        return match;
    }

    lookupElements(elementType) {
        let regex = new HtmlRegex(elementType);
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
