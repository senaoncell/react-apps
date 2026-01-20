// A function that calculates the arithmetic mean of a number sequence
export const getAverage = (array) =>
    array.reduce((sum, value) => sum + value / array.length, 0);