import RegexBuilder from 'oncody-regex/src/regex-builder.js';
import RegexFlag from 'oncody-regex/src/regex-flag.js';
import StringParser from "oncody-regex/src/string-parser.js";

// This class builds the regex to parse an HTML element opening tag
// TODO: split this class into two separate classes
export default class HtmlRegex {
    constructor(elementType) {
        let regexBuilder = new RegexBuilder();
        this._elementType = elementType;

        // TODO: Optionally only use global flag if looking for more than one match
        this._regex = regexBuilder.text(this._elementType.openingTag())
            .characterNotInString('>')
            .repeatZeroOrMoreTimes()
            .text('>')
            .addFlag(RegexFlag.GLOBAL)
            .build();
    }

    // TODO: Optionally only use global flag if looking for more than one match
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
            .addFlag(RegexFlag.GLOBAL)
            .build();

        return this;
    }

    // This one will not work if there is a nested element
    firstMatch(text) {
        // find the opening tag
        let openingTagMatch = this._regex.firstMatch(text)

        // grab all text between the opening tag and the closing tag
        let stringParser = new StringParser(text);
        return stringParser.matchBetweenTwoStrings(openingTagMatch.text(), this._elementType.closingTag());
    }

    allMatches(text) {
        let matches = this._regex.allMatches(text);

        let matchesTransformed = matches.map(match => {
            // console.log(match);
            let stringParser = new StringParser(text.substring(match.startPosition()));
            let fullMatch = stringParser.matchBetweenTwoStrings(match.text(), this._elementType.closingTag());
            return fullMatch;
        });

        return matchesTransformed;
    }
}
