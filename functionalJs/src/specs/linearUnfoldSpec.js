import FunctionalJs from '../FunctionalJs.js';

describe('Testing a linear unfold function', function() {
    function speadNumberToUnits(value) {
        if(value === 0) {
          return [null, null]
        }
      
        return [1, value-1];
      }      
  
    let value = 3;
    let result;

    describe('Calling linear unfold with object as callback', function () {
      it("Then I get a type error", function() { 
        expect(() => FunctionalJs.linearUnfold({}, value)).toThrow(new TypeError('Given callback argument is not a function'));
      });
    });
  
    describe('Calling linear unfold with value and callback function', function () {
      it("Then I get correct result", function() { 
        expect(FunctionalJs.linearUnfold(speadNumberToUnits, value)).toEqual([1, 1, 1]);
      });
    });
});