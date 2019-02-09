import FunctionalJs from '../FunctionalJs.js';

describe('Testing lazy function', function() {
  describe('Making a factorial of 10 function as lazy', function() {
    function factorial(n) {
      return (n != 1) ? n * factorial(n - 1) : 1;
    }

    let spiedObject;
    let spiedFactorial;  
    let factorial10Lazy;

    function refreshSpyObjectAndFunctions() {
      spiedObject = {
        factorialProp: (argument) => factorial(argument)
      }
      spyOn(spiedObject, 'factorialProp').and.callThrough();
      spiedFactorial = spiedObject.factorialProp.bind(spiedObject);
      factorial10Lazy = FunctionalJs.lazy(spiedFactorial, 10);
    }
    
    let result;
    let factorial10 = FunctionalJs.lazy(factorial, 10);
    it('Then I get a object', function() { 
      expect(typeof factorial10).toBe('function');
    });
  
    describe('When I execute function', function() {
      beforeEach(refreshSpyObjectAndFunctions);
      it('Then I get a correct answer', function() {
        result = factorial10Lazy();
        expect(result).toBe(3628800);
      });
    });
    
    describe('When I execute function twice', function() {
      beforeEach(refreshSpyObjectAndFunctions);
      it('Then I get a correct answer and one call of function', function() {
        result = factorial10Lazy();
        result = factorial10Lazy();
        expect(result).toBe(3628800);
        expect(spiedObject.factorialProp.calls.count() === 1);
      });
    });
    
    describe('Making lazy a function that returns undefined', function() {
      function returnsUndefined() {
        return undefined;
      }
      let spiedObject;
      let spiedFunction;
      let functionLazy;
      let result;  
  
      beforeEach(()=>{
        spiedObject = {
          funcProp: () => returnsUndefined()
        }
        spyOn(spiedObject, 'funcProp').and.callThrough();
        spiedFunction = spiedObject.funcProp.bind(spiedObject);
        functionLazy = FunctionalJs.lazy(spiedFunction);
      });
      it('Then I get undefined  and one call of function', function() {
        result = functionLazy();
        expect(result).toEqual(undefined);
        expect(spiedObject.funcProp.calls.count() === 1);
      });
    });
  });
});