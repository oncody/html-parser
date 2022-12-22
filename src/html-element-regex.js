import RegexBuilder from '../regex/regex-builder.js';
import RegexFlag from '../regex/regex-flag.js';
import HtmlAttribute from './html-attribute.js';

// This class builds the regex to parse an HTML element opening tag
export default class HtmlElementRegex {
    constructor(elementType) {
        let regexBuilder = new RegexBuilder();
        this._elementType = elementType;
        this._regex = regexBuilder.text(this._elementType.openingTag())
            .characterNotInString('>')
            .repeatZeroOrMoreTimes()
            .text('>')
            .addFlag(RegexFlag.MULTILINE)
            .addFlag(RegexFlag.GLOBAL)
            .build();
    }

    elementType() {
        return this._elementType;
    }

    regex() {
        return this._regex;
    }

    byAttribute(htmlAttribute, attributeValue) {
        let regexBuilder = new RegexBuilder();
        this._regex = regexBuilder.text(this._elementType.openingTag())
            .mandatoryWhitespace()
            .characterNotInString('>')
            .repeatZeroOrMoreTimes()
            .text(htmlAttribute.name())
            .optionalWhitespace()
            .text('=')
            .optionalWhitespace()
            .matchQuote()
            .text(attributeValue)
            .matchQuote()
            .characterNotInString('>')
            .repeatZeroOrMoreTimes()
            .text('>')
            .addFlag(RegexFlag.MULTILINE)
            .addFlag(RegexFlag.GLOBAL)
            .build();

        return this;
    }
}
