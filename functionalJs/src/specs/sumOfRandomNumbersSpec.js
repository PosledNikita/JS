import FunctionalJs from '../FunctionalJs.js';

describe('Calling a sumOfRandomNumbers function', function() {
    let result;
    beforeEach(()=>{
        spyOn(FunctionalJs, 'linearFold').and.callThrough();
        spyOn(FunctionalJs, 'linearUnfold').and.callThrough();
    });
    
    it("Then I get a number as sum of randomed numbers, and one call of linearFold and linearUnfold functions", function() {
        result = FunctionalJs.sumOfRandomNumbers();
        expect(typeof result).toBe('number');
        expect(FunctionalJs.linearFold.calls.count()).toBe(1);
        expect(FunctionalJs.linearUnfold.calls.count()).toBe(1);                
    });
});  