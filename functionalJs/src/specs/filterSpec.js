import FunctionalJs from '../FunctionalJs.js';

describe('Testing a filter function', function() {
  function isEvenCallback(value) {
    if(value % 2 == 0) {
      return true;
    }
    return false;
  }
  
  let array = [1, 4, 6, undefined, 10, 2, 9, 1, 5];
  let result;

  describe('Calling filter with array of numbers, and callback function', function () {
    it("Then I get a correct answer", function() { 
      result = FunctionalJs.filter(array, isEvenCallback);
      expect(result).toEqual(array.filter(isEvenCallback));
    });
  });
  
  describe('Calling filter with zero-length array', function () {
    it("Then I get an empty array", function() { 
      result = FunctionalJs.filter([], isEvenCallback);
      expect(result).toEqual([]);
    });
  });
  
  describe('Calling map with object as callback', function () {
    it("Then I get a type error", function() { 
      expect(() => FunctionalJs.filter(array, {})).toThrow(new TypeError('Given callback argument is not a function'));
    });
  });
});  