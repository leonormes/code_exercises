# Chinese Horoscope Calculator

Task: Create a program that prompts the user for their birth year; checks to see the information is correct, and then; tells them their animal year and element.

Reference: [http://www.astrologizeme.com/your_chinese_sign.shtml](http://www.astrologizeme.com/your_chinese_sign.shtml)

To validate the year that the user types in, you can use the yearRegex (Regular Expression) in the file, like so:

```javascript
var isValidYear = yearRegex.test(yearString);
```
