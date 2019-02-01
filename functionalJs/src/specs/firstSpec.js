describe('Testing a first function', function() {
  
    function firstEvenCallback(current) {
        if(current % 2 == 0) {
            return true;
          }
          return false;
      }
  
    let array = [1, 4, 6, 10, 2, 9 , 1, 5];
    let result;
  
    describe('Calling first with array of numbers, and callback function', function () {
      it("Then I get a correct answer", function() { 
        result = FunctionalJs.first(array, firstEvenCallback);
        expect(result).toEqual(array.find(firstEvenCallback));
      });
    });

    describe('Calling first with zero-length array', function () {
      it("Then I get an undefined", function() { 
        result = FunctionalJs.first([], firstEvenCallback);
        expect(result).toBe(undefined);
      });
    });
  
    describe('Calling first with string as callback', function () {
        it("Then I get a type error", function() { 
            expect(() => FunctionalJs.first(array, 'someString')).toThrow(new TypeError('Given condition argument is not a function'));
        });
    });
});  
