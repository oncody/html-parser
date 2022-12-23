export default class HtmlAttribute {
    static ID = new HtmlAttribute('id');
    static CLASS = new HtmlAttribute('class');

    constructor(name) {
        this._name = name
    }

    name() {
        return this._name;
    }
}
