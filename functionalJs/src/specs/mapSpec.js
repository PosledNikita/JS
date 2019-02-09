import FunctionalJs from '../FunctionalJs.js';

describe('Testing a map function', function() {
  function doubleOddNumbersCallback(current) {
    if(current % 2 === 0) {
      return current;
    }
    return current * 2;
  }

  let array = [1, 4, undefined, 6, 10, 2, 9, 1, 5];
  let result;

  describe('Calling map with array of numbers, and callback function', function () {
    it("Then I get a correct answer", function() { 
      result = FunctionalJs.map(array, doubleOddNumbersCallback);
      expect(result).toEqual(array.map(doubleOddNumbersCallback));
    });
  });

  describe('Calling map with zero-length array', function () {
    it("Then I get an empty array", function() { 
      result = FunctionalJs.map([], doubleOddNumbersCallback);
      expect(result).toEqual([]);
    });
  });

  describe('Calling map with object as callback', function () {
    it("Then I get a type error", function() { 
      expect(() => FunctionalJs.map(array, {})).toThrow(new TypeError('Given callback argument is not a function'));
    });
  });
});  