import FunctionalJs from '../FunctionalJs.js';

describe('Testing curry function', function() {
    describe('Making a curried function out of a sum of 3 numbers function', function() {
        function sumOf3Numbers(a, b, c) {
            return a + b + c;
        }
      
        let curried = FunctionalJs.curry(sumOf3Numbers);
        let result;
        
        it('Then I get a function', function() { 
            expect(typeof curried).toBe('function');
        });
      
        describe('When I call function one time', function() {
            it("Then I get a function", function() {
                result = curried(1);
                expect(typeof result).toBe('function');
            });
        });
      
        describe('When I call a function two times', function() {
            it("Then I get a function", function() { 
                result = curried(1)(2);
                expect(typeof result).toBe('function');
            });
        });
      
        describe('When I call a function three times', function() {
            it("Then I get a correct answer", function() { 
                result = curried(1)(2)(3);
                expect(result).toBe(6);
            });
        });

        describe('When I call a function one time with three arguments', function() {
            it("Then I get a correct answer", function() { 
                result = curried(1, 2, 3);
                expect(result).toBe(6);
            });
        });

        describe('When I make a chain of three function executions ', function() {
            let first;
            let second;
            let fourth;
            it("Then I get a function", function() { 
                first = FunctionalJs.curry(sumOf3Numbers);
                second = first(1);
                first = second(1);
                fourth = second(1);
                expect(typeof fourth).toBe('function');
            });
        });

    });

    describe('Making a curried function out of zero arguments length function', function() {  
        function zeroArgumentsFunction() {
            return 'someValue';
        }
        let curried = FunctionalJs.curry(zeroArgumentsFunction);
        it("Then I get a function", function() { 
            expect(typeof curried).toBe('function');
        });    
    });
});