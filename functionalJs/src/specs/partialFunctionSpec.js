import FunctionalJs from '../FunctionalJs.js';

describe('Testing partialApplication function', function() {
  describe('Making a doubleNumber function as partial out of multiply function', function() {
    function multiply(x, y) {
      return x * y;
    }
  
    let doubleNumber = FunctionalJs.partialFunction(multiply, 2);
    let result;
    
    it('Then I get a function', function() { 
      expect(typeof doubleNumber).toBe('function');
    });
  
    describe('When I pass 3 as argument', function() {
      it('Then I get 6 as answer', function() {
        result = doubleNumber(3);
        expect(result).toBe(6);
      });
    });
  
    describe('When I pass 5 and 3 as arguments', function() {
      it('Then I get 10 as answer', function() {
        result = doubleNumber(5, 3);
        expect(result).toBe(10);
      });
    });
  
    describe('When I pass not a number as argument', function() {
      it('Then I get NaN as answer', function() {
        result = doubleNumber('notANumber');
        expect(isNaN(result)).toBeTruthy();
      });
    });      
  });
});