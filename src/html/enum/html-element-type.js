
// Different HTML element types
export default class HtmlElementType {
    static HTML = new HtmlElementType('html');
    static HEAD = new HtmlElementType('head');
    static BODY = new HtmlElementType('body');
    static DIV = new HtmlElementType('div');
    static SPAN = new HtmlElementType('span');
    static PARAGRAPH = new HtmlElementType('p');
    static NUMBERED_LIST = new HtmlElementType('ol');
    static BULLETED_LIST = new HtmlElementType('ul');
    static ANCHOR = new HtmlElementType('a');
    static IMAGE = new HtmlElementType('img');
    static TABLE = new HtmlElementType('table');
    static TABLE_BODY = new HtmlElementType('tbody');
    static TABLE_HEAD = new HtmlElementType('thead');
    static TABLE_FOOTER = new HtmlElementType('tfoot');
    static TABLE_DATA = new HtmlElementType('td');
    static TABLE_ROW = new HtmlElementType('tr');
    static TABLE_HEADER = new HtmlElementType('th');
    static COLUMN = new HtmlElementType('col');
    static COLUMN_GROUP = new HtmlElementType('colgroup');
    static BUTTON = new HtmlElementType('button');
    static FORM = new HtmlElementType('form');
    static INPUT = new HtmlElementType('input');
    static LABEL = new HtmlElementType('label');
    static SELECT = new HtmlElementType('select');
    static OPTION = new HtmlElementType('option');
    static TEXT_AREA = new HtmlElementType('textarea');
    static H1 = new HtmlElementType('h1');
    static H2 = new HtmlElementType('h2');
    static H3 = new HtmlElementType('h3');
    static H4 = new HtmlElementType('h4');
    static H5 = new HtmlElementType('h5');
    static H6 = new HtmlElementType('h6');

    /**
     * @param {string} tagName
     * @returns {HtmlElementType}
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
