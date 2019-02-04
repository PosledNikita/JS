import FunctionalJs from '../FunctionalJs.js';

describe('Calling a sumOfRandomNumbers function', function() {
  
    let result;
    it("Then I get a number as sum of randomed numbers", function() { 
        result = FunctionalJs.sumOfRandomNumbers();
        expect(typeof result).toBe('number');
    });
});  