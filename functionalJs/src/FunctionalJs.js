let FunctionalJs = {};

FunctionalJs.partialFunction = function(func, ...args) {
    return (...additionalArgs) => (func.call(null, ...args, ...additionalArgs));
}

FunctionalJs.curry = (f) => {
        const func = f;
        const ARGS_LENGTH = f.length;    

        if(ARGS_LENGTH === 0){
            return func();
        }

        return function curryProxy(...args) {
            let funcArgs = [];
            funcArgs.push(...args);
            if(funcArgs.length >= ARGS_LENGTH){
                return func(...funcArgs);
            }
            return function diveInto(...x) {
                funcArgs.push(...x);
                return curryProxy(...funcArgs);
            }
                
        }  
}

FunctionalJs.linearFold = (array, callback, initialValue) => {
    let index = 0;
    let previousValue = null;

    if(initialValue === undefined && array.length === 0) {
        throw new TypeError('LinearFold of empty array with no initial value');
    }
    else if(initialValue === undefined && array.length < 2) {
        return array[0];
    }
    
    if(typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    if(initialValue !== undefined) {
        previousValue = initialValue;
    } else {
        previousValue = array[0];
        index++;
    }

     function linearFoldRecursive () {
        previousValue = callback(previousValue, array[index], index, array);
        if(index !== array.length - 1) {
            linearFoldRecursive(++index);
        }
        return previousValue;

    }

    return linearFoldRecursive(index);
 
}

FunctionalJs.linearUnfold = (callback, initialValue) => {
    let resultSequence = [];
    let currentState = initialValue;

    if(typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    function linearUnfoldRecursive() {
        let [nextElement, nextState] = callback(currentState);

        if(!nextElement) {
            return resultSequence;
        }
        resultSequence.push(nextElement);

        if(!nextState) {
            return resultSequence;
        }
        currentState = nextState;
        return linearUnfoldRecursive();
    }

    return linearUnfoldRecursive();
    
}

FunctionalJs.map = (array, callback) => {
    let resultArray = [];
    if(typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    function mapRecursive (index = 0) {
        if(index < array.length) {
            resultArray.push(callback(array[index], index, array));
            return mapRecursive(++index);
        }

        return resultArray;
    }

    return mapRecursive();
}

FunctionalJs.filter = (array, callback) => {
    let resultArray = [];

    if(typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    function filterRecursive(index = 0) {
        if(index < array.length) {
            if(callback(array[index], index, array)) {
                resultArray.push(array[index]);
            }
            return filterRecursive(++index);
        }

        return resultArray;
    }

    return filterRecursive();

}

FunctionalJs.avgOfEvenNumbers = function (array) {
    if(!(array instanceof Array)) {
        return 0;
    }
    let evenArray = this.filter(array, number => number % 2 === 0);
    if(evenArray.length === 0) {
        return 0;
    }
    return this.linearFold(evenArray, (previous, current) => previous + current) / evenArray.length;
}

FunctionalJs.sumOfRandomNumbers = function () {
    let array = [];

    function pushRandomNumbers(count) {
        if(count > 0) {
            array.push(generateRandomNumber(0,10));
            pushRandomNumbers(--count);
        }
    }

    pushRandomNumbers(10);

    return this.linearFold(array, (sum, number) => sum + number);

    function generateRandomNumber(min, max) 
    {
        return Math.random() * (max-min) + min ;
    }    
}

FunctionalJs.first = (array, condition) => {
    if(!(array instanceof Array)) {
        return undefined;
    }

    if(typeof condition !== 'function') {
        throw new TypeError('Given condition argument is not a function');
    }

    function firstRecursive(index = 0) {
        if(index < array.length) {
            if(condition(array[index], index, array)) {
                return array[index];
            }
            return firstRecursive(++index);
        }

        return undefined;
    }

    return firstRecursive()
}

FunctionalJs.lazy = (func, ...parameters) => {

    let lazyfunc = () => {
        let savedResult;
        let lazyObject = {
            get Value() {
                if(savedResult === undefined) {
                    savedResult = func(...parameters);
                }
                return savedResult;
            }
        }
        return lazyObject;
    }

    return lazyfunc();
}

FunctionalJs.memoize = (fn) => {
    let savedResults = new Map();
    let memoized =  function (argument) {
        
      if (savedResults.has(argument)) {
        return savedResults.get(argument);
      }
      else {
        let result = fn(argument);
        savedResults.set(argument, result);
        return result;
      }
    }
    return memoized;
}

export default FunctionalJs;