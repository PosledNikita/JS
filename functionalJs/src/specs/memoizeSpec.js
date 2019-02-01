describe('Testing memoize function', function() {

    describe('Making a exponentiation of 3 and another number as memoized', function() {
  
        function exp3(n) {
            return n ** 3;
        }
      
        let exp3Memoized = FunctionalJs.memoize(exp3);
        let result;
        
        it('Then I get a function', function() { 
          expect(typeof exp3Memoized).toBe('function');
        });
      
        describe('When I execute function one time with 3 as argument', function() {
          it('Then I get a correct answer and 1 value in saved results', function() {
            exp3Memoized = FunctionalJs.memoize(exp3);
            result = exp3Memoized(3);         
            expect(result == 27 && exp3Memoized.savedResultsCount == 1).toBeTruthy();
          });
        });
        
        describe('When I execute function two times with 3 as argument', function() {
          it('Then I get a correct answer and 1 value in saved results', function() {
            exp3Memoized = FunctionalJs.memoize(exp3);
            result = exp3Memoized(3);
            result = exp3Memoized(3);         
            expect(result == 27 && exp3Memoized.savedResultsCount == 1).toBeTruthy();
          });
        });
        
        describe('When I execute function two times with 3 and five as arguments', function() {
            
          it('Then I get a correct answer and 2 values in saved results', function() {   
            exp3Memoized = FunctionalJs.memoize(exp3);
            result = exp3Memoized(3);
            result = exp3Memoized(5);   
            expect(result == 125 && exp3Memoized.savedResultsCount == 2).toBeTruthy();
          });
        });   
    });
});