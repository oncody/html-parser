import {RegexBuilder, RegexCharacter} from "@oncody/regex";

import {ElementRegex} from "./element-regex.js";

// This class builds the regex to parse an HTML element opening tag
class ElementByAttributeRegex extends ElementRegex {

    /**
     * @param {ElementType} elementType
     * @param {string} attribute
     * @param {string} value
     * @returns {ElementByAttributeRegex}
     */
    constructor(elementType, attribute, value) {
        super(elementType);

        this._regex = new RegexBuilder()
            .match(this._elementType.openingTag())
            .match(RegexCharacter.WHITESPACE.toString())
            .atLeastOnceGreedy()
            .matchSingleCharacterOutside('>')
            .anyNumberOfTimesGreedy()
            .match(attribute)
            .match(RegexCharacter.WHITESPACE.toString())
            .anyNumberOfTimesGreedy()
            .match('=')
            .match(RegexCharacter.WHITESPACE.toString())
            .anyNumberOfTimesGreedy()
            .matchSingleCharacterInside('\'"')
            .match(value)
            .matchSingleCharacterInside('\'"')
            .matchSingleCharacterOutside('>')
            .anyNumberOfTimesGreedy()
            .match('>')
            .build();
    }
}

export {ElementByAttributeRegex}
