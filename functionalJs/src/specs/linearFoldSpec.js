import FunctionalJs from '../FunctionalJs.js';

describe('Testing a linear fold function', function() {
    function sumCallback(prev, current) {
        return prev + current; 
    }
     
    let array = [1, 4, 6, 10, 2];
    let result;
     
    describe('Calling linear fold with array of numbers, callback, and initial value', function () {
        it("Then I get a correct answer", function() { 
            result = FunctionalJs.linearFold(array, sumCallback, 10);
            expect(result).toBe(array.reduce(sumCallback, 10));
        });
    });
     
    describe('Calling linear fold with array of numbers and callback', function () {
        it("Then I get a correct answer", function() { 
            result = FunctionalJs.linearFold(array, sumCallback);
            expect(result).toBe(array.reduce(sumCallback));
        });
    });
     
    describe('Calling linear fold with zero-length array and without initial value', function () {
        it("Then I get a type error", function() { 
            expect(() => FunctionalJs.linearFold([], sumCallback)).toThrow(new TypeError('LinearFold of empty array with no initial value'));
        });
    });
     
    describe('Calling linear fold with object as callback', function () {
        it("Then I get a type error", function() { 
            expect(() => FunctionalJs.linearFold(array, {})).toThrow(new TypeError('Given callback argument is not a function'));
        });
    });
    
    describe('Calling linear fold with array of numbers and undefined in it', function () {
        it("Then I get a correct answer", function() { 
            let array = [1, 4, 6, undefined, 10, 2];
            result = FunctionalJs.linearFold(array, sumCallback);
            expect(result).toEqual(array.reduce(sumCallback));
        });
    });
});