/**
 * Different HTML element types
 */
class ElementType {
    static HTML = new ElementType('html');
    static HEAD = new ElementType('head');
    static BODY = new ElementType('body');
    static DIV = new ElementType('div');
    static SPAN = new ElementType('span');
    static PARAGRAPH = new ElementType('p');
    static NUMBERED_LIST = new ElementType('ol');
    static BULLETED_LIST = new ElementType('ul');
    static ANCHOR = new ElementType('a');
    static IMAGE = new ElementType('img');
    static TABLE = new ElementType('table');
    static TABLE_BODY = new ElementType('tbody');
    static TABLE_HEAD = new ElementType('thead');
    static TABLE_FOOTER = new ElementType('tfoot');
    static TABLE_DATA = new ElementType('td');
    static TABLE_ROW = new ElementType('tr');
    static TABLE_HEADER = new ElementType('th');
    static COLUMN = new ElementType('col');
    static COLUMN_GROUP = new ElementType('colgroup');
    static BUTTON = new ElementType('button');
    static FORM = new ElementType('form');
    static INPUT = new ElementType('input');
    static LABEL = new ElementType('label');
    static SELECT = new ElementType('select');
    static OPTION = new ElementType('option');
    static TEXT_AREA = new ElementType('textarea');
    static H1 = new ElementType('h1');
    static H2 = new ElementType('h2');
    static H3 = new ElementType('h3');
    static H4 = new ElementType('h4');
    static H5 = new ElementType('h5');
    static H6 = new ElementType('h6');

    /**
     * @param {string} tagName
     * @returns {ElementType}
     */
    constructor(tagName) {
        this._tagName = tagName;
    }

    /**
     * @returns {string}
     */
    openingTag() {
        return `<${this.toString()}`;
    }

    /**
     * @returns {string}
     */
    closingTag() {
        return `</${this.toString()}>`;
    }

    /**
     * @returns {string}
     */
    toString() {
        return this._tagName;
    }
}

export {ElementType}