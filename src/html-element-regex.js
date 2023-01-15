import Regex from "@oncody/regex";

let Match = Regex.Match();

// This class builds the regex to parse an HTML element opening tag
export default class HtmlElementRegex {

    /**
     * @param {HtmlElementType} elementType
     * @returns {HtmlElementRegex}
     */
    constructor(elementType) {
        this._elementType = elementType;
        this._regex = new Regex.Builder()
            .match(this._elementType.openingTag())
            .matchSingleCharacterOutside('>')
            .anyNumberOfTimesGreedy()
            .match('>')
            .build();
    }

    /**
     * This will not work if there is a nested element
     * @param {string} text
     * @returns {Match}
     */
    firstMatch(text) {
        // find the opening tag
        let openingTagMatch = this._regex.firstMatch(text)

        // grab all text between the opening tag and the closing tag
        let stringParser = new Regex.StringParser(text);
        return stringParser.matchBetweenTwoStrings(openingTagMatch.text(), this._elementType.closingTag());
    }

    /**
     * This will not work if there is a nested element
     * @param {string} text
     * @returns {Match[]}
     */
    allMatches(text) {
        let matches = this._regex.allMatches(text);

        return matches.map(match => {
            // console.log(match);
            let stringParser = new Regex.StringParser(text.substring(match.startPosition()));
            return stringParser.matchBetweenTwoStrings(match.text(), this._elementType.closingTag());
        });
    }
}
