describe('Testing lazy function', function() {

    describe('Making a factorial of 10 function as lazy', function() {
  
        function factorial(n) {
            return (n != 1) ? n * factorial(n - 1) : 1;
        }
      
        let factorial10 = FunctionalJs.lazy(factorial, 10);
        let result;
        
        it('Then I get a function', function() { 
          expect(typeof factorial10).toBe('function');
        });
      
        describe('When I execute function once again', function() {
          it('Then I get a correct answer', function() {
            result = factorial10();
            expect(result).toBe(3628800);
          });
        });     
    });
});