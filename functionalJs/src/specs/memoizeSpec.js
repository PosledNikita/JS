import FunctionalJs from '../FunctionalJs.js';

describe('Testing memoize function', function() {
    describe('Making a exponentiation of 3 and another number as memoized', function() {
        let spiedObject;
        let spiedFactorial;
        let result;
    
        function refreshSpyObjectAndFunctions() {
            spiedObject = {
                factorial: FunctionalJs.memoize(function (n) {
                    return (n != 1) ? n * spiedObject.factorial(n - 1) : 1;
                })
            };
    
            spyOn(spiedObject, 'factorial').and.callThrough();
            spiedFactorial = spiedObject.factorial;
        }
    
        beforeEach(refreshSpyObjectAndFunctions);
        it('Then I get a function', function() { 
          expect(typeof spiedFactorial).toBe('function');
        });
      
        describe('When I execute function one time with 10 as argument', function() {
            beforeEach(refreshSpyObjectAndFunctions);
            it('Then I get a correct answer and 10 executions of function', function() {
                result = spiedFactorial(10);         
                expect(result).toBe(3628800);
                expect(spiedObject.factorial.calls.count()).toBe(10); 
            });
        });
        
        describe('When I execute function two times with 10 and 3 as arguments', function() {
            beforeEach(refreshSpyObjectAndFunctions);
            it('Then I get a correct answers and 11 executions of function instead of 15', function() {
                spiedFactorial(10);
                result = spiedFactorial(5); 
                expect(result).toBe(120);
                expect(spiedObject.factorial.calls.count()).toBe(11);        
            });
        });
    });
});