import FunctionalJs from '../FunctionalJs.js';

describe('Testing memoize function', function() {

    describe('Making a exponentiation of 3 and another number as memoized', function() {
  
        function exp3(n) {
            return n ** 3;
        }

        let spiedObject;
        let spiedExp3;
        let exp3Memoized = FunctionalJs.memoize(exp3);
        let result;

        function refreshSpyObjectAndFunctions() {
          spiedObject = {
            exp3Prop: (argument) => exp3(argument)
            }
          spyOn(spiedObject, 'exp3Prop').and.callThrough();
          spiedExp3 = spiedObject.exp3Prop.bind(spiedObject);
          exp3Memoized = FunctionalJs.memoize(spiedExp3);
        }
        
        it('Then I get a function', function() { 
          expect(typeof exp3Memoized).toBe('function');
        });
      
        describe('When I execute function one time with 3 as argument', function() {
          beforeEach(refreshSpyObjectAndFunctions);
          it('Then I get a correct answer and 1 execution of function', function() {
            result = exp3Memoized(3);         
            expect(result).toBe(27);
            expect(spiedObject.exp3Prop.calls.count()).toBe(1); 
          });
        });
        
        describe('When I execute function two times with 3 as argument', function() {
          beforeEach(refreshSpyObjectAndFunctions);
          it('Then I get a correct answer and 1 execution of function', function() {
            result = exp3Memoized(3);
            result = exp3Memoized(3); 
            expect(result).toBe(27);
            expect(spiedObject.exp3Prop.calls.count()).toBe(1);        
          });
        });
        
        describe('When I execute function two times with 3 and 5 as arguments', function() {
          beforeEach(refreshSpyObjectAndFunctions);
          it('Then I get a correct answer and 2 executions of function', function() {   
            result = exp3Memoized(3);
            result = exp3Memoized(5);   
            expect(result).toBe(125);
            expect(spiedObject.exp3Prop.calls.count()).toBe(2); 
          });
        });   
    });
});