export default class HtmlAttribute {
    static ID = new HtmlAttribute('id');
    static CLASS = new HtmlAttribute('class');

    /**
     * @param {string} name
     * @returns {HtmlAttribute}
     */
    constructor(name) {
        this._name = name
    }

    /**
     * @returns {string}
     */
    name() {
        return this._name;
    }

    /**
     * @returns {string}
     */
    toString() {
        return this._name;
    }
}
