
// This class represents an html element
export default class HtmlElement {
    constructor(elementType, html, indexStart, indexEnd, text) {
        this._elementType = elementType;
        this._html = html;
        this._indexStart = indexStart;
        this._indexEnd = indexEnd;
        this._text = text;
    }

    elementType() {
        return this._elementType;
    }

    html() {
        return this._html;
    }

    indexStart() {
        return this._indexStart;
    }

    indexEnd() {
        return this._indexEnd;
    }

    text() {
        return this._text;
    }

    // An array of all classes
    classes() {

    }

    // Key-Value pair of attribute names and their values
    attributes() {

    }

    // A list of all nested sub elements
    subElements() {

    }
}
