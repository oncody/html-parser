export default class MatchType {
    static FIRST_MATCH = new MatchType('firstMatch');
    static ALL_MATCHES = new MatchType('allMatches');

    constructor(name) {
        this._name = name;
    }
}
