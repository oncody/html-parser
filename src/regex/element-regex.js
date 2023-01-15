import {RegexBuilder, Match, StringParser} from "@oncody/regex";

/**
 * This class builds the regex to parse an HTML element opening tag
 */
class ElementRegex {

    /**
     * @param {ElementType} elementType
     * @returns {ElementRegex}
     */
    constructor(elementType) {
        this._elementType = elementType;
        this._regex = new RegexBuilder()
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
        let stringParser = new StringParser(text);
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
            let stringParser = new StringParser(text.substring(match.startPosition()));
            return stringParser.matchBetweenTwoStrings(match.text(), this._elementType.closingTag());
        });
    }
}

export {ElementRegex}
