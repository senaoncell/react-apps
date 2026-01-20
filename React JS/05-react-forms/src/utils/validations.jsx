/* 
\S+ -> One or more characters without spaces
@ -> @ symbol
\. -> The dot (.) character (written with an escape character, because the dot has a special meaning in regex)
*/

//It checks whether a valid email address exists using a regular expression
export function isEmail(value) {
    var re = /\S+@\S+\.\S+/;
    return re.test(value); //It tests the regex on the value
}

//It Checks if the given value is empty
export function isNotEmpty(value) {
    return value.trim() != ""; //Removes spaces at the beginning and end of the value.
    //Returns true if the trimmed value is not empty
}

//It checks whether the length of the given value is within the specified minimum length
export function hasMinLength(value, minLength) {
    return value.length >= minLength;
}

//It checks if the given value is equal to valueToCompare
export function isEquals(value, valueToCompare) {
    return value === valueToCompare;
}
// It uses the === operator to check both the "value" and the "type"