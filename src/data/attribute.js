class Attribute {
    static ID = new Attribute('id');
    static CLASS = new Attribute('class');

    /**
     * @param {string} name
     * @returns {Attribute}
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

export {Attribute}
