import FunctionalJs from '../FunctionalJs.js';

describe('Testing a avgOfEvenNumbers function', function() {
    let array = [1, 2, 4, 7, 6, 9, 1, 5];
    let result;
  
    describe('Calling function with array of numbers', function () {
        it("Then I get a correct answer", function() { 
            result = FunctionalJs.avgOfEvenNumbers(array);
            expect(result).toBe(4);
        });
    });
    
    describe('Calling function with array of numbers, strings, and objects', function () {
        let array = [1, 2, '4', '5', {}, {number: 5}, [], null]
        it("Then I get a correct answer", function() { 
            result = FunctionalJs.avgOfEvenNumbers(array);
            expect(result).toBe(1.5);
        });
    });
    
    describe('Calling function with zero-length array', function () {
        it("Then I get a 0", function() { 
            expect( FunctionalJs.avgOfEvenNumbers([])).toBe(0);
        });
    });
    
    describe('Calling function with object as array', function () {
        it("Then I get a 0 as correct answer", function() { 
            result = FunctionalJs.avgOfEvenNumbers({});
            expect(result).toEqual(0);
        });
    });
});  