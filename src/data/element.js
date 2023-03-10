/**
 * This class represents an html element
 */
class Element {
    /**
     * @param {ElementType} elementType
     * @param {string} html
     * @param {number} indexStart
     * @param {number} indexEnd
     * @param {string} text
     * @returns {Element}
     */
    constructor(elementType, html, indexStart, indexEnd, text) {
        this._elementType = elementType;
        this._html = html;
        this._indexStart = indexStart;
        this._indexEnd = indexEnd;
        this._text = text;
    }

    /**
     * @returns {ElementType}
     */
    elementType() {
        return this._elementType;
    }

    /**
     * @returns {string}
     */
    html() {
        return this._html;
    }

    /**
     * @returns {number}
     */
    indexStart() {
        return this._indexStart;
    }

    /**
     * @returns {number}
     */
    indexEnd() {
        return this._indexEnd;
    }

    /**
     * @returns {string}
     */
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

export {Element}
