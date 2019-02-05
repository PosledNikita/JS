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
          expect(typeof factorial10).toBe('object');
        });
      
        describe('When I get a value from object', function() {
          beforeEach(refreshSpyObjectAndFunctions);

          it('Then I get a correct answer', function() {
            result = factorial10Lazy.Value;
            expect(result).toBe(3628800);
          });
        });
        
        describe('When I get a value from object twice', function() {
          beforeEach(refreshSpyObjectAndFunctions);

          it('Then I get a correct answer and one call of function', function() {
            result = factorial10Lazy.Value;
            result = factorial10Lazy.Value;
            expect(result).toBe(3628800);
            expect(spiedObject.factorialProp.calls.count() === 1);
          });
        });     
    });
});