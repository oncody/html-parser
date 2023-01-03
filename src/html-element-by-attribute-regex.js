import HtmlElementRegex from "./html-element-regex.js";
import RegexBuilder from "oncody-regex/src/regex-builder.js";
import RegexCharacter from "oncody-regex/src/regex-character.js";

// This class builds the regex to parse an HTML element opening tag
export default class HtmlElementByAttributeRegex extends HtmlElementRegex {
    constructor(elementType, attribute, value) {
        super(elementType);

        this._regex = new RegexBuilder()
            .match(this._elementType.openingTag())
            .match(RegexCharacter.WHITESPACE)
            .atLeastOnceGreedy()
            .matchSingleCharacterOutside('>')
            .anyNumberOfTimesGreedy()
            .match(attribute)
            .match(RegexCharacter.WHITESPACE)
            .anyNumberOfTimesGreedy()
            .match('=')
            .match(RegexCharacter.WHITESPACE)
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